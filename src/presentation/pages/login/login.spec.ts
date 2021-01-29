import { render } from '@testing-library/vue'
import Login from './login.vue'
import { store } from '@/presentation/store'

describe('Login Component', () => {
  test('Should start with initial state', () => {
    const { getByTestId } = render(Login, { store })
    const errorWrap = getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)
    const submitButton = getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
  })
})
