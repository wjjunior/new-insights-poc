import { RequiredFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols/field-validation'

export const requiredFieldValidation = (field: string): FieldValidation => ({
  field,
  validate: (value: string): Error => {
    return value ? null : new RequiredFieldError()
  }
})
