"use client"

import { useRouter }
  from "next/navigation"

import JobForm,
{
  JobFormData
}
from "./JobForm"

export default function EditJobForm({
  jobId,
  job,
}: {
  jobId: string
  job: JobFormData
}) {
  const router =
    useRouter()

  async function updateJob(
    data: JobFormData
  ) {
    const response =
      await fetch(
        `/api/jobs/${jobId}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(data),
        }
      )

    if (!response.ok) {
      alert(
        "Failed to update job"
      )
      return
    }

    router.push(`/jobs/${jobId}`)
  }

  return (
    <JobForm
      defaultValues={job}
      onSubmit={updateJob}
      buttonText="Update Job"
    />
  )
}