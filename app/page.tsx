"use client";
import JobCard from "@/components/JobCard";
import { useEffect, useState } from "react";
import Loading from "./loading";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  const jobs = [
    {
      id: 1,
      title: "Full Stack Developer",
      company: "Ethiopian Airlines",
      budget: 50000,
      featured: true,
    },
    {
      id: 2,
      title: "Build a Next.js App",
      company: "Tech Co.",
      budget: 7000,
      featured: true,
    },
    {
      id: 3,
      title: "Spring boot java",
      company: "Osta",
      budget: 5000,
      featured: false,
    },
    {
      id: 4,
      title: "Dotnet Developer",
      company: "Addis Ababa University",
      budget: 50000,
      featured: false,
    },
  ];

  const featuredJobs = jobs.filter((job) => job.featured);

  return (
    <>

      <main className="flex-1 max-w-5xl mx-auto px-4 py-8">
        <section className="grid gap-6 sm:grid-cols-2">
          <div className="bg-blue-100 border border-blue-300 rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Featured Jobs
            </h2>

            {featuredJobs.map((job) => (
              <JobCard
                key={job.id}
                title={job.title}
                company={job.company}
                budget={job.budget}
              />
            ))}
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              All Jobs
            </h2>
            {jobs.map((job) => (
              <JobCard
                key={job.id}
                title={job.title}
                company={job.company}
                budget={job.budget}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
