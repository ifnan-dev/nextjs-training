import { notFound } from "next/navigation"

import EditJobForm from "@/components/EditJobForm"
import { getJobById } from "@/services/jobs.service"

export default async function EditPage({
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
      <h1 className="text-4xl font-bold mb-6">Edit Job</h1>

      <EditJobForm
        jobId={jobId}
        job={{
          title: job.title,
          description: job.description,
          budget: job.budget,
        }}
      />
    </div>
  )
}
