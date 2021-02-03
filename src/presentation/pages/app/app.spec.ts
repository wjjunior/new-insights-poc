import { store } from '@/presentation/store'
import { flushPromises, mount } from '@vue/test-utils'
import { App, Router as router } from '@/presentation/pages'
import { AccessTokenMock } from '@/presentation/test'
import { UnexpectedError } from '@/domain/errors'
import { GetterTypes } from '@/presentation/store/modules'

const makeSut = (accessTokenMock: AccessTokenMock): void => {
  mount(App, {
    props: {
      accessToken: accessTokenMock
    },
    global: {
      plugins: [store, router]
    }
  })
}

test('Should call get AccessToken on success', async () => {
  const accessTokenMock = new AccessTokenMock()
  const spy = jest.spyOn(accessTokenMock, 'get')
  makeSut(accessTokenMock)
  await flushPromises()
  expect(spy).toHaveBeenCalled()
})

test('Should set error if get AccessToken fails', async () => {
  const accessTokenMock = new AccessTokenMock()
  const error = new UnexpectedError()
  jest.spyOn(accessTokenMock, 'get').mockReturnValueOnce(Promise.reject(error))
  makeSut(accessTokenMock)
  await flushPromises()
  expect(store.getters[GetterTypes.errorMessage as string]).toBe(error.message)
})
