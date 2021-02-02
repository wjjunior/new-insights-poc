import { Storage } from '@/data/protocols/cache/storage'
import faker from 'faker'
import 'jest-localstorage-mock'
import { localStorageAdapter } from './local-storage-adapter'

const makeSut = (): Storage => localStorageAdapter()

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear()
  })
  test('Should call LocalStorage set with correct values', async () => {
    const sut = makeSut()
    const key = faker.database.column()
    const value = faker.random.word()
    await sut.set(key, value)
    expect(localStorage.setItem).toHaveBeenCalledWith(key, value)
  })

  test('Should call LocalStorage get with correct values', async () => {
    const sut = makeSut()
    const key = faker.database.column()
    await sut.get(key)
    expect(localStorage.getItem).toHaveBeenCalledWith(key)
  })
})
