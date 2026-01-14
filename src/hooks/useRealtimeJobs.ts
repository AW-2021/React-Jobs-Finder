import { useState, useEffect } from "react";
import { supabase } from "../supabase-client";
import { type Job } from "../lib/types";
import { RealtimeChannel } from "@supabase/supabase-js";

export const useRealtimeJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let channel: RealtimeChannel;

    const fetchJobs = async () => {
      try {
        const { error, data } = await supabase
          .from("jobs")
          .select("*")
          .order("created_at", { ascending: true });

        if (error) {
          console.error("Error reading jobs:", error.message);
        } else {
          setJobs(data ?? []);
        }
      } catch (err: any) {
        console.error("Error reading jobs:", err.message);
      } finally {
        setLoading(false);
      }
    };

    const setupRealtimeSubscription = () => {
      channel = supabase
        .channel("jobs-channel")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "jobs",
          },
          (payload) => {
            // console.log("Real-time update received:", payload);

            if (payload.eventType === "INSERT") {
              setJobs((currentJobs) => [...currentJobs, payload.new as Job]);
            } else if (payload.eventType === "UPDATE") {
              setJobs((currentJobs) =>
                currentJobs.map((job) =>
                  job.id === payload.new.id ? (payload.new as Job) : job
                )
              );
            } else if (payload.eventType === "DELETE") {
              setJobs((currentJobs) =>
                currentJobs.filter((job) => job.id !== payload.old.id)
              );
            }
          }
        )
        .subscribe();
    };

    fetchJobs();
    setupRealtimeSubscription();

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, []);

  return { jobs, loading };
};
