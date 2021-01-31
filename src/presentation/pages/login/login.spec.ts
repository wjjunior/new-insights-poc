import { mount, VueWrapper } from '@vue/test-utils'
import faker from 'faker'
import Login from './login.vue'
import { store } from '@/presentation/store'
import { ValidationStub } from '@/presentation/test'
import { ComponentPublicInstance } from 'vue'

type SutTypes = {
  sut: VueWrapper<ComponentPublicInstance>;
};

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const sut = mount(Login, {
    props: {
      validation: validationStub
    },
    global: {
      plugins: [store]
    }
  })
  return {
    sut
  }
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
    const emailStatus = sut.get('[data-test="email-status"]')
    expect(emailStatus.attributes('title')).toBe(validationError)
    expect(emailStatus.element.textContent).toBe('🔴')
    const passwordStatus = sut.get('[data-test="password-status"]')
    expect(passwordStatus.attributes('title')).toBe(validationError)
    expect(passwordStatus.element.textContent).toBe('🔴')
  })

  test('Should show email error if Validation fails', async () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    sut.setData({ email: faker.internet.email() })
    await sut.vm.$nextTick()
    const emailStatus = sut.get('[data-test="email-status"]')
    expect(emailStatus.attributes('title')).toBe(validationError)
    expect(emailStatus.element.textContent).toBe('🔴')
  })

  test('Should show password error if Validation fails', async () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    sut.setData({ password: faker.internet.password() })
    await sut.vm.$nextTick()
    const passwordStatus = sut.get('[data-test="password-status"]')
    expect(passwordStatus.attributes('title')).toBe(validationError)
    expect(passwordStatus.element.textContent).toBe('🔴')
  })

  test('Should show valid email state if Validation success', async () => {
    const { sut } = makeSut()
    sut.setData({ email: faker.internet.email() })
    await sut.vm.$nextTick()
    const emailStatus = sut.get('[data-test="email-status"]')
    expect(emailStatus.attributes('title')).toBe('Tudo certo!')
    expect(emailStatus.element.textContent).toBe('🟢')
  })

  test('Should show valid password state if Validation success', async () => {
    const { sut } = makeSut()
    sut.setData({ password: faker.internet.password() })
    await sut.vm.$nextTick()
    const passwordStatus = sut.get('[data-test="password-status"]')
    expect(passwordStatus.attributes('title')).toBe('Tudo certo!')
    expect(passwordStatus.element.textContent).toBe('🟢')
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
})
