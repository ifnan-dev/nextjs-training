import Link from "next/link"

import CreateJobLink from "@/components/CreateJobLink"
import { getJobs } from "@/services/jobs.service"

export default async function JobsPage() {
  const jobs = await getJobs()

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Available Jobs
        </h1>

        <CreateJobLink />
      </div>

      {jobs.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-surface p-12 text-center text-muted">
          No jobs posted yet.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {jobs.map((job) => (
            <Link key={job.id} href={`/jobs/${job.id}`} className="group">
              <div className="h-full rounded-xl border border-border bg-surface p-5 shadow-sm transition-all hover:shadow-md hover:border-primary/30">
                <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {job.title}
                </h2>
                <p className="mt-2 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                  ${job.budget}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
