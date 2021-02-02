import { emailValidation, requiredFieldValidation, minLengthValidation } from '@/validation/validators'
import { makeValidationBuilder as sut } from './validator-builder'
import faker from 'faker'

describe('ValidationBuilder', () => {
  test('Should return RequiredFieldValidation', () => {
    const field = faker.database.column()
    const validations = sut(field).required().build()
    expect(validations.toString()).toEqual([requiredFieldValidation(field)].toString())
  })

  test('Should return EmailValidation', () => {
    const field = faker.database.column()
    const validations = sut(field).email().build()
    expect(validations.toString()).toEqual([emailValidation(field)].toString())
  })

  test('Should return MinLengthValidation', () => {
    const field = faker.database.column()
    const length = faker.random.number()
    const validations = sut(field).min(length).build()
    expect(validations.toString()).toEqual([minLengthValidation(field, length)].toString())
  })

  test('Should return a list of validations', () => {
    const field = faker.database.column()
    const length = faker.random.number()
    const validations = sut(field).required().email().min(length).build()
    expect(validations.toString()).toEqual([
      requiredFieldValidation(field),
      emailValidation(field),
      minLengthValidation(field, length)
    ].toString())
  })
})
