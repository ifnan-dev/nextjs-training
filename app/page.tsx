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
    <div className="max-w-5xl mx-auto">
      <section className="mb-10 rounded-2xl bg-gradient-to-br from-primary to-accent px-8 py-12 text-white shadow-sm">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Find your next opportunity
        </h1>
        <p className="mt-3 max-w-xl text-white/90">
          Browse open jobs from top companies, or post your own and hire
          skilled freelancers on FreelanceHub.
        </p>
        <a
          href="/jobs"
          className="mt-6 inline-flex items-center rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-primary shadow-sm hover:bg-white/90 transition-colors"
        >
          Browse all jobs
        </a>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-surface p-6">
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            ⭐ Featured Jobs
          </h2>

          {featuredJobs.map((job) => (
            <JobCard
              key={job.id}
              title={job.title}
              company={job.company}
              budget={job.budget}
              featured
            />
          ))}
        </div>

        <div className="rounded-2xl border border-border bg-surface p-6">
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            All Jobs
          </h2>
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              title={job.title}
              company={job.company}
              budget={job.budget}
              featured={job.featured}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
