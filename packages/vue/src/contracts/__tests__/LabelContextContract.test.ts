import { createProvider, render } from '../../test-utils'
import { LabelContextContract } from '../LabelContextContract'

const {
  renderProvider,
  ContextConsumer: LabelContextConsumer,
  ContextConsumerComponent,
} = createProvider<LabelContextContract>('LabelContext')

test('throws an if no provider exists to perform the contract', () => {
  console.warn = jest.fn()
  expect(() => render(ContextConsumerComponent)).toThrowError()
})

test('the contract defines a htmlFor property', () => {
  renderProvider({
    htmlFor: 'username',
  })

  expect(LabelContextConsumer).toHaveBeenReceived({
    htmlFor: 'username',
  })
})

test('htmlFor can be null', () => {
  renderProvider({
    htmlFor: null,
  })

  expect(LabelContextConsumer).toHaveBeenReceived({
    htmlFor: null,
  })
})

test('the contract defines an id property', () => {
  renderProvider({
    id: 'username-label',
  })

  expect(LabelContextConsumer).toHaveBeenReceived({
    id: 'username-label',
  })
})

test('id can be null', () => {
  renderProvider({
    id: null,
  })

  expect(LabelContextConsumer).toHaveBeenReceived({
    id: null,
  })
})

test('the contract defines an optional property', () => {
  renderProvider({
    optional: true,
  })

  expect(LabelContextConsumer).toHaveBeenReceived({
    optional: true,
  })
})

test('the contract defines a disabled property', () => {
  renderProvider({
    disabled: true,
  })

  expect(LabelContextConsumer).toHaveBeenReceived({
    disabled: true,
  })
})

test('the contract defines an invalid property', () => {
  renderProvider({
    invalid: true,
  })

  expect(LabelContextConsumer).toHaveBeenReceived({
    invalid: true,
  })
})
