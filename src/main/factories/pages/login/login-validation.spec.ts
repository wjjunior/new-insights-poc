import { makeValidationComposite } from '@/validation/validators'
import { makeValidationBuilder } from '@/validation/validators/builder/validator-builder'
import { makeLoginValidation } from './login-validation-factory'

describe('LoginValidationFactory', () => {
  test('Should make ValidationComposite with correct validations', () => {
    const composite = makeLoginValidation()
    expect(composite.toString()).toEqual(
      makeValidationComposite([
        ...makeValidationBuilder('email').required().email().build(),
        ...makeValidationBuilder('password').required().min(5).build()
      ]).toString()
    )
  })
})
