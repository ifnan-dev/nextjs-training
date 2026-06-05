type FlattenedZodError = {
  formErrors?: string[]
  fieldErrors?: Record<string, string[]>
}

export function formatApiError(error: unknown): string {
  if (typeof error === "string") {
    return error
  }

  if (error && typeof error === "object") {
    const flattened = error as FlattenedZodError

    if (flattened.fieldErrors) {
      const messages = Object.values(flattened.fieldErrors).flat()
      if (messages.length > 0) {
        return messages.join("\n")
      }
    }

    if (flattened.formErrors?.length) {
      return flattened.formErrors.join("\n")
    }
  }

  return "Something went wrong"
}
