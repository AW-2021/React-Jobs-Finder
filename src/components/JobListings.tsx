import JobListing from "./JobListing";
import Spinner from "./Spinner";
import { useState, useEffect } from "react";
import { type Job } from "../lib/types";
import { supabase } from "../supabase-client";

const JobListings = ({ isHome = false }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { error, data } = await supabase
          .from("jobs")
          .select("*")
          .order("created_at", { ascending: true });
        setJobs(data ?? []);
      } catch (err: any) {
        console.error("Error reading jobs", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-center text-indigo-500 mb-6">
          {isHome ? "Recent Jobs" : "Browse Jobs"}
        </h2>

        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobListing key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default JobListings;
