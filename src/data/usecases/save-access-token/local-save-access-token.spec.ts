import { makeLocalSaveAccessToken } from './local-save-access-token'
import { SetStorageMock } from '@/data/test/mock-storage'
import faker from 'faker'
import { SaveAccessToken } from '@/domain/usecases/save-access-token'

type SutTypes = {
    sut: SaveAccessToken
    setStorageMock: SetStorageMock
}

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock()
  const sut = makeLocalSaveAccessToken(setStorageMock)
  return {
    sut,
    setStorageMock
  }
}

describe('LocalSaveAccessToken', () => {
  test('Should call SetStorage with correct values', async () => {
    const { sut, setStorageMock } = makeSut()
    const accessToken = faker.random.uuid()
    await sut.save(accessToken)
    expect(setStorageMock.key).toBe('accessToken')
    expect(setStorageMock.value).toBe(accessToken)
  })
})
