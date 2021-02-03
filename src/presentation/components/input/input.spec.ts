import { mount, VueWrapper } from '@vue/test-utils'
import faker from 'faker'
import { ComponentPublicInstance } from 'vue'
import Input from './input.vue'

type SutTypes = {
  sut: VueWrapper<ComponentPublicInstance>;
};

const makeSut = (fieldName: string): SutTypes => {
  const sut = mount(Input, {
    props: {
      name: fieldName,
      state: 'active'
    }
  })
  return {
    sut
  }
}

describe('Input Component', () => {
  test('Should begin with readOnly', () => {
    const field = faker.database.column()
    const { sut } = makeSut(field)
    const input = sut.get(`[data-test="${field}"]`)
    expect(input.attributes('readonly')).toBeDefined()
  })

  test('Should remove readOnly on focus', async () => {
    const field = faker.database.column()
    const { sut } = makeSut(field)
    const input = sut.get(`[data-test="${field}"]`)
    input.trigger('focus')
    await sut.vm.$nextTick()
    expect(input.attributes('readonly')).toBeUndefined()
  })

  test('Should emit on change', async () => {
    const field = faker.database.column()
    const { sut } = makeSut(field)
    const input = sut.get(`[data-test="${field}"]`)
    input.setValue(faker.random.word())
    expect(sut.emitted('update:value')).toBeTruthy()
  })
})
