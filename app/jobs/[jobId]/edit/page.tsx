import EditJobForm
  from "@/components/EditJobForm"

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

export default async function EditPage({
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
      <h1 className="text-4xl font-bold mb-6">
        Edit Job
      </h1>

      <EditJobForm
        jobId={jobId}
        job={job}
      />
    </div>
  )
}