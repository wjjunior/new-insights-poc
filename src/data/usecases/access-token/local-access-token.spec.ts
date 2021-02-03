import { makeLocalAccessToken } from './local-access-token'
import { StorageMock } from '@/data/test/mock-storage'
import faker from 'faker'
import { AccessToken } from '@/domain/usecases/access-token'

type SutTypes = {
  sut: AccessToken;
  storageMock: StorageMock;
};

const makeSut = (): SutTypes => {
  const storageMock = new StorageMock()
  const sut = makeLocalAccessToken(storageMock)
  return {
    sut,
    storageMock
  }
}

describe('LocalSaveAccessToken', () => {
  test('Should call Storage with correct values', async () => {
    const { sut, storageMock } = makeSut()
    const accessToken = faker.random.uuid()
    await sut.save(accessToken)
    expect(storageMock.key).toBe('accessToken')
    expect(storageMock.value).toBe(accessToken)
  })

  test('Should throw if Storage throws', async () => {
    const { sut, storageMock } = makeSut()
    jest.spyOn(storageMock, 'set').mockRejectedValueOnce(new Error())
    const promise = sut.save(faker.random.uuid())
    await expect(promise).rejects.toThrow(new Error())
  })
  test('Should call Storage get with correct values', async () => {
    const { sut, storageMock } = makeSut()
    const accessToken = faker.random.uuid()
    storageMock.value = accessToken
    const getToken = await sut.get()
    expect(getToken).toBe(accessToken)
  })

  test('Should throw if Storage get throws', async () => {
    const { sut, storageMock } = makeSut()
    jest.spyOn(storageMock, 'get').mockRejectedValueOnce(new Error())
    const promise = sut.get()
    await expect(promise).rejects.toThrow(new Error())
  })
})
