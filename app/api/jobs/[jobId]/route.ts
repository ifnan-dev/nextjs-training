import {
  getJobById,
  updateJob,
  deleteJob,
} from "@/services/jobs.service"

import {
  createJobSchema,
} from "@/lib/validations/job.schema"

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      jobId: string
    }>
  }
) {
  try {
    const { jobId } =
      await params

    const job =
      await getJobById(jobId)

    if (!job) {
      return Response.json(
        {
          error:
            "Job not found",
        },
        {
          status: 404,
        }
      )
    }

    return Response.json(job)

  } catch {
    return Response.json(
      {
        error:
          "Failed to fetch job",
      },
      {
        status: 500,
      }
    )
  }
}

export async function PUT(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      jobId: string
    }>
  }
) {
  try {
    const { jobId } =
      await params

    const body =
      await request.json()

    const validated =
      createJobSchema.safeParse(
        body
      )

    if (!validated.success) {
      return Response.json(
        {
          error:
            validated.error.flatten(),
        },
        {
          status: 400,
        }
      )
    }

    const job =
      await updateJob(
        jobId,
        validated.data
      )

    return Response.json(job)

  } catch {
    return Response.json(
      {
        error:
          "Failed to update job",
      },
      {
        status: 500,
      }
    )
  }
}

export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      jobId: string
    }>
  }
) {
  try {
    const { jobId } =
      await params

    await deleteJob(jobId)

    return Response.json({
      success: true,
    })

  } catch {
    return Response.json(
      {
        error:
          "Failed to delete job",
      },
      {
        status: 500,
      }
    )
  }
}