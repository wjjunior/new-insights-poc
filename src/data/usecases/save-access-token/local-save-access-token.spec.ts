import { makeLocalSaveAccessToken } from './local-save-access-token'
import { StorageMock } from '@/data/test/mock-storage'
import faker from 'faker'
import { SaveAccessToken } from '@/domain/usecases/save-access-token'

type SutTypes = {
    sut: SaveAccessToken
    storageMock: StorageMock
}

const makeSut = (): SutTypes => {
  const storageMock = new StorageMock()
  const sut = makeLocalSaveAccessToken(storageMock)
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
})
