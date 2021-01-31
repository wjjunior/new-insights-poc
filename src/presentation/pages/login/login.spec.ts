import { mount, VueWrapper } from '@vue/test-utils'
import faker from 'faker'
import Login from './login.vue'
import { store } from '@/presentation/store'
import { ValidationSpy } from '@/presentation/test'
import { ComponentPublicInstance } from 'vue'

type SutTypes = {
  sut: VueWrapper<ComponentPublicInstance>;
  validationSpy: ValidationSpy;
};

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  validationSpy.errorMessage = faker.random.words()
  const sut = mount(Login, {
    props: {
      validation: validationSpy
    },
    global: {
      plugins: [store]
    }
  })
  return {
    sut,
    validationSpy
  }
}

describe('Login Component', () => {
  test('Should start with initial state', () => {
    const { sut, validationSpy } = makeSut()
    const errorWrap = sut.get('[data-test="error-wrap"]')
    expect(errorWrap.element.childElementCount).toBe(0)
    const submitButton = sut.get('[data-test="submit"]')
      .element as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
    const emailStatus = sut.get('[data-test="email-status"]')
    expect(emailStatus.attributes('title')).toBe(validationSpy.errorMessage)
    expect(emailStatus.element.textContent).toBe('🔴')
    const passwordStatus = sut.get('[data-test="password-status"]')
    expect(passwordStatus.attributes('title')).toBe('Campo obrigatório')
    expect(passwordStatus.element.textContent).toBe('🔴')
  })

  test('Should call validation with correct email', async () => {
    const { sut, validationSpy } = makeSut()
    const email = faker.internet.email()
    sut.setData({ email })
    await sut.vm.$nextTick()
    expect(validationSpy.fieldName).toEqual('email')
    expect(validationSpy.fieldValue).toEqual(email)
  })

  test('Should call validation with correct password', async () => {
    const { sut, validationSpy } = makeSut()
    const password = faker.internet.password()
    sut.setData({ password })
    await sut.vm.$nextTick()
    expect(validationSpy.fieldName).toEqual('password')
    expect(validationSpy.fieldValue).toEqual(password)
  })

  test('Should show email error if Validation fails', async () => {
    const { sut, validationSpy } = makeSut()
    sut.setData({ email: faker.internet.email() })
    await sut.vm.$nextTick()
    const emailStatus = sut.get('[data-test="email-status"]')
    expect(emailStatus.attributes('title')).toBe(validationSpy.errorMessage)
    expect(emailStatus.element.textContent).toBe('🔴')
  })
})
