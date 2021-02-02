import { Validation } from '@/presentation/protocols/validation'
import { FieldValidation } from '@/validation/protocols/field-validation'
import { makeFieldValidationSpy } from '@/validation/test'
import faker from 'faker'
import { makeValidationComposite } from './validation-composite'

type SutTypes = {
  sut: Validation;
  fieldValidationsSpy: FieldValidation[];
};

const makeSut = (fieldName: string): SutTypes => {
  const fieldValidationsSpy = [
    makeFieldValidationSpy(fieldName),
    makeFieldValidationSpy(fieldName)
  ]

  const sut = makeValidationComposite(fieldValidationsSpy)
  return {
    sut,
    fieldValidationsSpy
  }
}

describe('ValidationComposite', () => {
  test('Should return error if any validation fails', () => {
    const fieldName = faker.database.column()
    const { sut, fieldValidationsSpy } = makeSut(fieldName)
    const errorMessage = faker.random.words()
    fieldValidationsSpy[0].setError(new Error(errorMessage))
    fieldValidationsSpy[1].setError(new Error(faker.random.words()))
    const error = sut.validate(fieldName, faker.random.word())
    expect(error).toBe(errorMessage)
  })

  test('Should return falsy if validations are valid', () => {
    const fieldName = faker.database.column()
    const { sut } = makeSut(fieldName)
    const error = sut.validate('any_field', faker.random.word())
    expect(error).toBeFalsy()
  })
})
