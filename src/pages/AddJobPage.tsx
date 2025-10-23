import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
//import { toast } from "react-toastify";
import { supabase } from "../supabase-client";
import { type Job, type Company } from "../lib/types";

const initialJob = {
  title: "",
  type: "Full-Time",
  description: "",
  salary: "Under $50K",
  location: "",
};

const initialCompany = {
  name: "",
  description: "",
  contact_email: "",
  contact_phone: "",
};

const AddJobPage = () => {
  const companies: Company[] = useLoaderData();

  const [newJob, setNewJob] = useState<Job>(initialJob);

  const [newCompany, setNewCompany] = useState<Company>(initialCompany);
  const [isCompanyNew, setIsCompanyNew] = useState<boolean>(false);
  const [companyId, setCompanyId] = useState<number | undefined>(undefined);

  const navigate = useNavigate();

  const activeBtnStyle =
    "bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-1.5 px-4 w-full focus:outline-none focus:shadow-outline";
  const btnStyle =
    "bg-white border-2 border-indigo-500 hover:bg-indigo-600 hover:text-white text-black font-bold py-1.5 px-4 w-full focus:outline-none focus:shadow-outline";

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let company_id = companyId;

    if (isCompanyNew) {
      const { data, error: companiesError } = await supabase
        .from("companies")
        .insert(newCompany)
        .select()
        .single();

      if (companiesError) {
        console.error("Error adding new company: ", companiesError.message);
        return;
      }
      company_id = data.id;
    }

    const { error: jobsError } = await supabase
      .from("jobs")
      .insert({ ...newJob, company_id })
      .single();

    if (jobsError) {
      console.error("Error adding new job: ", jobsError.message);
      return;
    }

    setNewJob(initialJob);
    setNewCompany(initialCompany);
    setCompanyId(undefined);

    //toast.success('Job Added Successfully!');
    return navigate("/jobs");
  };

  return (
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border border-gray-200 m-4 md:m-0">
          <form onSubmit={submitForm}>
            <h2 className="text-3xl text-center font-semibold mb-6">Add Job</h2>

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
                className="border border-gray-200 rounded w-full py-2 px-3"
                required
                value={newJob.type}
                onChange={(e) =>
                  setNewJob((prev) => ({ ...prev, type: e.target.value }))
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
                className="border border-gray-200 rounded w-full py-2 px-3 mb-2"
                placeholder="eg. Full-Stack Web Developer"
                required
                value={newJob.title}
                onChange={(e) =>
                  setNewJob((prev) => ({ ...prev, title: e.target.value }))
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
                className="border border-gray-200 rounded w-full py-2 px-3"
                rows={4}
                placeholder="Add any job duties, expectations, requirements, etc."
                value={newJob.description}
                onChange={(e) =>
                  setNewJob((prev) => ({
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
                className="border border-gray-200 rounded w-full py-2 px-3"
                required
                value={newJob.salary}
                onChange={(e) =>
                  setNewJob((prev) => ({ ...prev, salary: e.target.value }))
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
                className="border border-gray-200 rounded w-full px-3 py-2 mb-2"
                placeholder="Company Location"
                required
                value={newJob.location}
                onChange={(e) =>
                  setNewJob((prev) => ({ ...prev, location: e.target.value }))
                }
              />
            </div>

            <h3 className="text-2xl mb-5">Company Info</h3>

            <div className="flex rounded-full mb-4">
              <button
                type="button"
                className={`${
                  isCompanyNew ? activeBtnStyle : btnStyle
                } rounded-l-full border-r-0`}
                onClick={() => setIsCompanyNew((prev) => !prev)}
              >
                New Company
              </button>

              <button
                type="button"
                className={`${
                  isCompanyNew ? btnStyle : activeBtnStyle
                } rounded-r-full border-l-0`}
                onClick={() => setIsCompanyNew((prev) => !prev)}
              >
                Existing Company
              </button>
            </div>

            {isCompanyNew ? (
              <>
                <div className="mb-4">
                  <label
                    htmlFor="new_company"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="new_company"
                    name="new_company"
                    required
                    className="border border-gray-200 rounded w-full px-3 py-2"
                    placeholder="Company Name"
                    value={newCompany.name}
                    onChange={(e) =>
                      setNewCompany((prev) => ({
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
                    className="border border-gray-200 rounded w-full py-2 px-3"
                    rows={4}
                    placeholder="What does your company do?"
                    value={newCompany.description}
                    onChange={(e) =>
                      setNewCompany((prev) => ({
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
                    className="border border-gray-200 rounded w-full px-3 py-2"
                    placeholder="Email address for applicants"
                    required
                    value={newCompany.contact_email}
                    onChange={(e) =>
                      setNewCompany((prev) => ({
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
                    className="border border-gray-200 rounded w-full px-3 py-2"
                    placeholder="Optional phone for applicants"
                    value={newCompany.contact_phone}
                    onChange={(e) =>
                      setNewCompany((prev) => ({
                        ...prev,
                        contact_phone: e.target.value,
                      }))
                    }
                  />
                </div>
              </>
            ) : (
              <div className="mb-4">
                <label
                  htmlFor="old_company"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Company Name
                </label>
                <select
                  id="old_company"
                  name="old_company"
                  required
                  className="border border-gray-200 rounded w-full py-2 px-3"
                  value={companyId}
                  onChange={(e) => setCompanyId(Number(e.target.value))}
                >
                  {companies.map((company) => (
                    <option key={company.id} value={company.id}>
                      {company.id}. {company.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="mt-7">
              <button
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Add Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

const companiesLoader = async () => {
  const { error, data } = await supabase
    .from("companies")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Error fetching companies: ", error.message);
    return null;
  }
  return data;
};

export { AddJobPage as default, companiesLoader };
