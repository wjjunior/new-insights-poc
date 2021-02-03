import { Validation } from '@/presentation/protocols/validation'
import { FieldValidation } from '@/validation/protocols/field-validation'

export const makeValidationComposite = (validators: FieldValidation[]): Validation => ({
  validate: (fieldName: string, fieldValue: string): string => {
    const fieldValidators = validators.filter((v) => v.field === fieldName)
    for (const validator of fieldValidators) {
      const error = validator.validate(fieldValue)
      /* istanbul ignore else  */
      if (error) {
        return error.message
      }
    }
  }

})
