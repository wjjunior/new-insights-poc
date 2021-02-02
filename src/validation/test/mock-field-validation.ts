import { FieldValidation } from '@/validation/protocols/field-validation'

export const makeFieldValidationSpy = (field: string, error: Error = null): FieldValidation => ({
  field,
  validate: (value: string): Error => {
    return error
  },
  setError: (value: Error): void => {
    error = value
  }
})
