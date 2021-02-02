import { SetStorage } from '@/data/protocols/cache/set-storage'
import faker from 'faker'
import 'jest-localstorage-mock'
import { localStorageAdapter } from './local-storage-adapter'

const makeSut = (): SetStorage => localStorageAdapter()

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear()
  })
  test('Should call LocalStorage with correct values', async () => {
    const sut = makeSut()
    const key = faker.database.column()
    const value = faker.random.word()
    await sut.set(key, value)
    expect(localStorage.setItem).toHaveBeenCalledWith(key, value)
  })
})
