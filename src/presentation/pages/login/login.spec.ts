import { mount, VueWrapper } from '@vue/test-utils'

import Login from './login.vue'
import { store } from '@/presentation/store'
import { Validation } from '@/presentation/protocols/validation'
import { ComponentPublicInstance } from 'vue'

class ValidationSpy implements Validation {
  errorMessage: string;
  input: Record<string, unknown>;

  validate (input: Record<string, unknown>): string {
    this.input = input

    return this.errorMessage
  }
}

type SutTypes = {
  sut: VueWrapper<ComponentPublicInstance>;
  validationSpy: ValidationSpy;
};

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
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
    const { sut } = makeSut()
    const errorWrap = sut.get('[data-test="error-wrap"]')
    expect(errorWrap.element.childElementCount).toBe(0)
    const submitButton = sut.get('[data-test="submit"]')
      .element as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
    const emailStatus = sut.get('[data-test="email-status"]')
    expect(emailStatus.attributes('title')).toBe('Campo obrigatório')
    expect(emailStatus.element.textContent).toBe('🔴')
    const passwordStatus = sut.get('[data-test="password-status"]')
    expect(passwordStatus.attributes('title')).toBe('Campo obrigatório')
    expect(passwordStatus.element.textContent).toBe('🔴')
  })

  test('Should call validation with correct email', async () => {
    const { sut, validationSpy } = makeSut()
    sut.setData({ email: 'any_email' })
    await sut.vm.$nextTick()
    expect(validationSpy.input).toEqual({
      email: 'any_email'
    })
  })

  test('Should call validation with correct password', async () => {
    const { sut, validationSpy } = makeSut()
    sut.setData({ password: 'any_password' })
    await sut.vm.$nextTick()
    expect(validationSpy.input).toEqual({
      password: 'any_password'
    })
  })
})
