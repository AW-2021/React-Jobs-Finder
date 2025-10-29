import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { type Company, type Job } from "../lib/types";
import { supabase } from "../supabase-client";

const EditJobPage = () => {
  const job = useLoaderData();

  const [updatedJob, setUpdatedJob] = useState<Job>({
    title: job.title,
    type: job.type,
    description: job.description,
    salary: job.salary,
    location: job.location,
  });

  const [updatedCompany, setUpdatedCompany] = useState<Company>({
    name: job.companies.name,
    description: job.companies.description,
    contact_email: job.companies.contact_email,
    contact_phone: job.companies.contact_phone,
  });

  const navigate = useNavigate();

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error: companyError } = await supabase
      .from("companies")
      .update(updatedCompany)
      .eq("id", job.companies.id);

    if (companyError) {
      console.error("Error updating company ", companyError.message);
      return;
    }

    const { error: jobError } = await supabase
      .from("jobs")
      .update(updatedJob)
      .eq("id", job.id);

    if (jobError) {
      console.error("Error updating job ", jobError.message);
      return;
    }

    toast.success("Job Updated Successfully!");

    return navigate(`/jobs/${job.id}`);
  };

  return (
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border border-gray-200 m-4 md:m-0">
          <form onSubmit={submitForm}>
            <h2 className="text-3xl text-center font-semibold mb-6">
              Update Job
            </h2>

            <div className="mb-4">
              <label
                htmlFor="type"
                className="block text-gray-700 font-bold mb-2"
              >
                Job Type
              </label>
              <select
                id="type"
                name="type"
                className="border rounded w-full py-2 px-3"
                required
                value={updatedJob.type}
                onChange={(e) =>
                  setUpdatedJob((prev) => ({ ...prev, type: e.target.value }))
                }
              >
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Remote">Remote</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-gray-700 font-bold mb-2"
              >
                Job Listing Name
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="eg. Full-Stack Web Developer"
                required
                value={updatedJob.title}
                onChange={(e) =>
                  setUpdatedJob((prev) => ({ ...prev, title: e.target.value }))
                }
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 font-bold mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className="border rounded w-full py-2 px-3"
                rows={4}
                placeholder="Add any job duties, expectations, requirements, etc."
                value={updatedJob.description}
                onChange={(e) =>
                  setUpdatedJob((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              ></textarea>
            </div>

            <div className="mb-4">
              <label
                htmlFor="salary"
                className="block text-gray-700 font-bold mb-2"
              >
                Salary
              </label>
              <select
                id="salary"
                name="salary"
                className="border rounded w-full py-2 px-3"
                required
                value={updatedJob.salary}
                onChange={(e) =>
                  setUpdatedJob((prev) => ({ ...prev, salary: e.target.value }))
                }
              >
                <option value="Under $50K">Under $50K</option>
                <option value="$50K - 60K">$50K - $60K</option>
                <option value="$60K - 70K">$60K - $70K</option>
                <option value="$70K - 80K">$70K - $80K</option>
                <option value="$80K - 90K">$80K - $90K</option>
                <option value="$90K - 100K">$90K - $100K</option>
                <option value="$100K - 125K">$100K - $125K</option>
                <option value="$125K - 150K">$125K - $150K</option>
                <option value="$150K - 175K">$150K - $175K</option>
                <option value="$175K - 200K">$175K - $200K</option>
                <option value="Over $200K">Over $200K</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="location"
                className="block text-gray-700 font-bold mb-2"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                className="border rounded w-full px-3 py-2 mb-2"
                placeholder="Company Location"
                required
                value={updatedJob.location}
                onChange={(e) =>
                  setUpdatedJob((prev) => ({
                    ...prev,
                    location: e.target.value,
                  }))
                }
              />
            </div>

            <h3 className="text-2xl mb-5">Company Info</h3>

            <div className="mb-4">
              <label
                htmlFor="company"
                className="block text-gray-700 font-bold mb-2"
              >
                Company Name
              </label>
              <input
                type="text"
                id="company"
                name="company"
                className="border rounded w-full px-3 py-2"
                placeholder="Company Name"
                value={updatedCompany.name}
                onChange={(e) =>
                  setUpdatedCompany((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="company_description"
                className="block text-gray-700 font-bold mb-2"
              >
                Company Description
              </label>
              <textarea
                id="company_description"
                name="company_description"
                className="border rounded w-full py-2 px-3"
                rows={4}
                placeholder="What does your company do?"
                value={updatedCompany.description}
                onChange={(e) =>
                  setUpdatedCompany((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              ></textarea>
            </div>

            <div className="mb-4">
              <label
                htmlFor="contact_email"
                className="block text-gray-700 font-bold mb-2"
              >
                Contact Email
              </label>
              <input
                type="email"
                id="contact_email"
                name="contact_email"
                className="border rounded w-full px-3 py-2"
                placeholder="Email address for applicants"
                required
                value={updatedCompany.contact_email}
                onChange={(e) =>
                  setUpdatedCompany((prev) => ({
                    ...prev,
                    contact_email: e.target.value,
                  }))
                }
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="contact_phone"
                className="block text-gray-700 font-bold mb-2"
              >
                Contact Phone
              </label>
              <input
                type="tel"
                id="contact_phone"
                name="contact_phone"
                className="border rounded w-full px-3 py-2"
                placeholder="Optional phone for applicants"
                value={updatedCompany.contact_phone}
                onChange={(e) =>
                  setUpdatedCompany((prev) => ({
                    ...prev,
                    contact_phone: e.target.value,
                  }))
                }
              />
            </div>

            <div>
              <button
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Update Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditJobPage;
