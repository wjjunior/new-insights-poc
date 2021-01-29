import { render } from '@testing-library/vue'
import Login from './login.vue'
import { store } from '@/presentation/store'

describe('Login Component', () => {
  test('Should not render spinner and error on start', () => {
    const { getByTestId } = render(Login, { store })
    const errorWrap = getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)
  })
})
