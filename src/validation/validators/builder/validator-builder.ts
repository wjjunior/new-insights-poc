import { FieldValidation, ValidationBuilder } from '@/validation/protocols'
import { requiredFieldValidation, emailValidation, minLengthValidation } from '@/validation/validators'

export const makeValidationBuilder = (fieldName: string, validations: FieldValidation[] = []): ValidationBuilder => ({
  required: (): ValidationBuilder => {
    validations.push(requiredFieldValidation(fieldName))
    return makeValidationBuilder(fieldName, validations)
  },
  email: (): ValidationBuilder => {
    validations.push(emailValidation(fieldName))
    return makeValidationBuilder(fieldName, validations)
  },
  min: (length: number): ValidationBuilder => {
    validations.push(minLengthValidation(fieldName, length))
    return makeValidationBuilder(fieldName, validations)
  },
  build: (): FieldValidation[] => {
    return validations
  }
})
