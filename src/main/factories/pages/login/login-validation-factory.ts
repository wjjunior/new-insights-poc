import { Validation } from '@/presentation/protocols/validation'
import { makeValidationComposite } from '@/validation/validators'
import { makeValidationBuilder } from '@/validation/validators/builder/validator-builder'

export const makeLoginValidation = (): Validation => {
  return makeValidationComposite([
    ...makeValidationBuilder('email').required().email().build(),
    ...makeValidationBuilder('password').required().min(5).build()
  ])
}
