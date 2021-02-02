import { InvalidFieldError } from '@/validation/errors'
import { minLengthValidation } from './min-length-validation'
import faker from 'faker'
import { FieldValidation } from '@/validation/protocols'

const makeSut = (): FieldValidation => minLengthValidation(faker.database.column(), 5)

describe('MinLengthValidation', () => {
  test('Should return error if value is invalid', () => {
    const sut = makeSut()
    const error = sut.validate(faker.random.alphaNumeric(4))
    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return falsy if value is valid', () => {
    const sut = makeSut()
    const error = sut.validate(faker.random.alphaNumeric(5))
    expect(error).toBeFalsy()
  })
})
