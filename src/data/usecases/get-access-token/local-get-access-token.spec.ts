import { makeLocalGetAccessToken } from './local-get-access-token'
import { StorageMock } from '@/data/test/mock-storage'
import faker from 'faker'
import { GetAccessToken } from '@/domain/usecases/get-access-token'

type SutTypes = {
    sut: GetAccessToken
    storageMock: StorageMock
}

const makeSut = (): SutTypes => {
  const storageMock = new StorageMock()
  const sut = makeLocalGetAccessToken(storageMock)
  return {
    sut,
    storageMock
  }
}

describe('LocalSaveAccessToken', () => {
  test('Should call Storage get with correct values', async () => {
    const { sut, storageMock } = makeSut()
    const key = faker.database.column()
    const accessToken = faker.random.uuid()
    await sut.get(key, accessToken)
    expect(storageMock.value).toBe(accessToken)
  })

  test('Should throw if Storage get throws', async () => {
    const { sut, storageMock } = makeSut()
    jest.spyOn(storageMock, 'get').mockRejectedValueOnce(new Error())
    const promise = sut.get(faker.random.uuid())
    await expect(promise).rejects.toThrow(new Error())
  })
})
