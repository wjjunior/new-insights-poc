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

const testStatusForField = (
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

const testErrorWrapChildCount = (
  sut: VueWrapper<ComponentPublicInstance>,
  count: number
): void => {
  const errorWrap = sut.get('[data-test="error-wrap"]')
  expect(errorWrap.element.childElementCount).toBe(count)
}

const testElementExists = (
  sut: VueWrapper<ComponentPublicInstance>,
  fieldName: string
): void => {
  const el = sut.get(`[data-test="${fieldName}"]`).element
  expect(el).toBeTruthy()
}

const testElementText = (
  sut: VueWrapper<ComponentPublicInstance>,
  fieldName: string,
  text: string
): void => {
  const el = sut.get(`[data-test="${fieldName}"]`)
  expect(el.element.textContent).toBe(text)
}

const testButtonIsDisabled = (
  sut: VueWrapper<ComponentPublicInstance>,
  fieldName: string,
  isDisabled: boolean
): void => {
  const button = sut.get(`[data-test="${fieldName}"]`)
    .element as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
}

describe('Login Component', () => {
  beforeEach(() => {
    store.dispatch('reset')
    localStorage.clear()
  })
  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    testErrorWrapChildCount(sut, 0)
    testButtonIsDisabled(sut, 'submit', true)
    testStatusForField(sut, 'email', validationError)
    testStatusForField(sut, 'password', validationError)
  })

  test('Should show email error if Validation fails', async () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    sut.setData({ email: faker.internet.email() })
    await sut.vm.$nextTick()
    testStatusForField(sut, 'email', validationError)
  })

  test('Should show password error if Validation fails', async () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    sut.setData({ password: faker.internet.password() })
    await sut.vm.$nextTick()
    testStatusForField(sut, 'password', validationError)
  })

  test('Should show valid email state if Validation success', async () => {
    const { sut } = makeSut()
    sut.setData({ email: faker.internet.email() })
    await sut.vm.$nextTick()
    testStatusForField(sut, 'email')
  })

  test('Should show valid password state if Validation success', async () => {
    const { sut } = makeSut()
    sut.setData({ password: faker.internet.password() })
    await sut.vm.$nextTick()
    testStatusForField(sut, 'email')
  })

  test('Should enable submit button if form is valid', async () => {
    const { sut } = makeSut()
    sut.setData({ email: faker.internet.email() })
    sut.setData({ password: faker.internet.password() })
    await sut.vm.$nextTick()
    testButtonIsDisabled(sut, 'submit', false)
  })

  test('Should show spinner on submit', async () => {
    const { sut } = makeSut()
    await simulateValidSubmit(sut)
    testElementExists(sut, 'spinner')
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
    sut.get('[data-test="submit"]').trigger('click')
    testElementText(sut, 'main-error', error.message)
    testErrorWrapChildCount(sut, 1)
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
