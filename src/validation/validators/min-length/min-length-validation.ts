import { InvalidFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols/field-validation'

export const minLengthValidation = (field: string, minLength: number): FieldValidation => ({
  field,
  validate: (value: string): Error => {
    return value.length >= minLength ? null : new InvalidFieldError()
  }
})
