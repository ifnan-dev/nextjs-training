import Link from "next/link"
import { notFound } from "next/navigation"

import { getJobById } from "@/services/jobs.service"

export default async function JobPage({
  params,
}: {
  params: Promise<{ jobId: string }>
}) {
  const { jobId } = await params
  const job = await getJobById(jobId)

  if (!job) {
    notFound()
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-4xl font-bold">{job.title}</h1>

      <p className="mt-4">{job.description}</p>

      <p className="mt-4">Budget: ${job.budget}</p>

      <p className="mt-4 text-gray-600">Posted by: {job.client.name}</p>

      <div className="mt-8">
        <Link
          href={`/jobs/${job.id}/edit`}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Edit Job
        </Link>
      </div>
    </div>
  )
}
