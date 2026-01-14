import JobListing from "./JobListing";
import Spinner from "./Spinner";
import { useRealtimeJobs } from "../hooks/useRealtimeJobs";

const JobListings = ({ isHome = false }) => {
  const { jobs, loading } = useRealtimeJobs();

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-center text-indigo-500 mb-6">
          {isHome ? "Recent Jobs" : "Browse Jobs"}
        </h2>

        {loading ? (
          <Spinner loading={loading} />
        ) : jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {isHome
              ? jobs
                  .slice(0, 6)
                  .map((job) => <JobListing key={job.id} job={job} />)
              : jobs.map((job) => <JobListing key={job.id} job={job} />)}
          </div>
        ) : (
          <p className="text-center font-semibold">No job openings. Check back soon!</p>
        )}
      </div>
    </section>
  );
};

export default JobListings;
