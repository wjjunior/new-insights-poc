import { mount, VueWrapper } from '@vue/test-utils'
import faker from 'faker'
import Login from './login.vue'
import { store } from '@/presentation/store'
import { ValidationStub, AuthenticationSpy } from '@/presentation/test'
import { ComponentPublicInstance } from 'vue'

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
      plugins: [store]
    }
  })
  return {
    sut,
    authenticationSpy
  }
}

const simulateValidSubmit = (
  sut: VueWrapper<ComponentPublicInstance>,
  email = faker.internet.email(),
  password = faker.internet.password()
): void => {
  sut.setData({ email })
  sut.setData({ password })
  sut.get('[data-test="submit"]').trigger('click')
}

const simulateStatusForField = (
  sut: VueWrapper<ComponentPublicInstance>,
  fieldName: string,
  validationError?: string
): void => {
  const emailStatus = sut.get(`[data-test="${fieldName}-status"]`)
  expect(emailStatus.attributes('title')).toBe(validationError || 'Tudo certo!')
  expect(emailStatus.element.textContent).toBe(validationError ? '🔴' : '🟢')
}

describe('Login Component', () => {
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
    simulateValidSubmit(sut)
    await sut.vm.$nextTick()
    const spinner = sut.get('[data-test="spinner"]').element
    expect(spinner).toBeTruthy()
  })

  test('Should call authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    simulateValidSubmit(sut, email, password)
    await sut.vm.$nextTick()
    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })
})
