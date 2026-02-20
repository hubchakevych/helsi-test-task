import { ValidationError } from 'yup'

export const yupToFormErrors = (error: unknown): Record<string, string> => {
  if (!(error instanceof ValidationError)) {return {}}

  return error.inner.reduce<Record<string, string>>((acc, err) => {
    if (err.path && !acc[err.path]) {
      acc[err.path] = err.message
    }
    return acc
  }, {})
}
