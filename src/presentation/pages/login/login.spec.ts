import { mount, VueWrapper } from '@vue/test-utils'
import faker from 'faker'
import flushPromises from 'flush-promises'
import 'jest-localstorage-mock'
import { store } from '@/presentation/store'
import { ValidationStub, AuthenticationSpy } from '@/presentation/test'
import { ComponentPublicInstance } from 'vue'
import { InvalidCredentialsError } from '@/domain/errors'
import { Router as router, Login } from '@/presentation/pages'

type SutTypes = {
  sut: VueWrapper<ComponentPublicInstance>;
  authenticationSpy: AuthenticationSpy;
};

type SutParams = {
  validationError: string;
};

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  validationStub.errorMessage = params?.validationError
  const sut = mount(Login, {
    props: {
      validation: validationStub,
      authentication: authenticationSpy
    },
    global: {
      plugins: [store, router]
    }
  })
  return {
    sut,
    authenticationSpy
  }
}

const simulateValidSubmit = async (
  sut: VueWrapper<ComponentPublicInstance>,
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  sut.setData({ email })
  sut.setData({ password })
  sut.get('[data-test="submit"]').trigger('click')
  await sut.vm.$nextTick()
}

const simulateStatusForField = (
  sut: VueWrapper<ComponentPublicInstance>,
  fieldName: string,
  validationError?: string
): void => {
  const emailStatus = sut.get(`[data-test="${fieldName}-status"]`)
  expect(emailStatus.attributes('title')).toBe(
    validationError || 'Tudo certo!'
  )
  expect(emailStatus.element.textContent).toBe(validationError ? '🔴' : '🟢')
}

describe('Login Component', () => {
  beforeEach(() => {
    store.dispatch('reset')
    localStorage.clear()
  })
  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    const errorWrap = sut.get('[data-test="error-wrap"]')
    expect(errorWrap.element.childElementCount).toBe(0)
    const submitButton = sut.get('[data-test="submit"]')
      .element as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
    simulateStatusForField(sut, 'email', validationError)
    simulateStatusForField(sut, 'password', validationError)
  })

  test('Should show email error if Validation fails', async () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    sut.setData({ email: faker.internet.email() })
    await sut.vm.$nextTick()
    simulateStatusForField(sut, 'email', validationError)
  })

  test('Should show password error if Validation fails', async () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    sut.setData({ password: faker.internet.password() })
    await sut.vm.$nextTick()
    simulateStatusForField(sut, 'password', validationError)
  })

  test('Should show valid email state if Validation success', async () => {
    const { sut } = makeSut()
    sut.setData({ email: faker.internet.email() })
    await sut.vm.$nextTick()
    simulateStatusForField(sut, 'email')
  })

  test('Should show valid password state if Validation success', async () => {
    const { sut } = makeSut()
    sut.setData({ password: faker.internet.password() })
    await sut.vm.$nextTick()
    simulateStatusForField(sut, 'email')
  })

  test('Should enable submit button if form is valid', async () => {
    const { sut } = makeSut()
    sut.setData({ email: faker.internet.email() })
    sut.setData({ password: faker.internet.password() })
    await sut.vm.$nextTick()
    const submitButton = sut.get('[data-test="submit"]')
      .element as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })

  test('Should show spinner on submit', async () => {
    const { sut } = makeSut()
    await simulateValidSubmit(sut)
    const spinner = sut.get('[data-test="spinner"]').element
    expect(spinner).toBeTruthy()
  })

  test('Should call authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidSubmit(sut, email, password)
    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })

  test('Should call authentication only once', async () => {
    const { sut, authenticationSpy } = makeSut()
    await simulateValidSubmit(sut)
    await simulateValidSubmit(sut)
    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('Should not call authentication when form is invalid', async () => {
    const validationError = faker.random.words()
    const { sut, authenticationSpy } = makeSut({ validationError })
    sut.get('[data-test="submit"]').trigger('click')
    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('Should show error if Authentication fails', async () => {
    const { sut, authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest
      .spyOn(authenticationSpy, 'auth')
      .mockReturnValueOnce(Promise.reject(error))
    await simulateValidSubmit(sut)
    await flushPromises()
    const mainError = sut.get('[data-test="main-error"]')
    sut.get('[data-test="submit"]').trigger('click')
    expect(mainError.element.textContent).toBe(error.message)
    const errorWrap = sut.get('[data-test="error-wrap"]')
    expect(errorWrap.element.childElementCount).toBe(1)
  })

  test('Should add accessToken to localstorage on success', async () => {
    const { sut, authenticationSpy } = makeSut()
    await simulateValidSubmit(sut)
    await flushPromises()
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'accessToken',
      authenticationSpy.account.accessToken
    )
    expect(sut.vm.$route.path).toBe('/')
  })
})
