import Link from "next/link"

async function getJob(
  jobId: string
) {
  const response = await fetch(
    `http://localhost:3000/api/jobs/${jobId}`,
    {
      cache: "no-store",
    }
  )

  if (!response.ok) {
    throw new Error("Job not found")
  }

  return response.json()
}

export default async function JobPage({
  params,
}: {
  params: Promise<{
    jobId: string
  }>
}) {
  const { jobId } =
    await params

  const job =
    await getJob(jobId)

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-4xl font-bold">
        {job.title}
      </h1>

      <p className="mt-4">
        {job.description}
      </p>

      <p className="mt-4">
        Budget: ${job.budget}
      </p>

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