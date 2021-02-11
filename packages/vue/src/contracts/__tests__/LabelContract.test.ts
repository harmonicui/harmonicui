import { createProvider } from '../../test-utils'
import { LabelContext, LabelContract } from '../LabelContract'

const {
  renderProvider,
  consumer: LabelContextConsumer,
} = createProvider<LabelContract>(LabelContext, 'LabelContext')

test('the contract defines a htmlFor property', () => {
  renderProvider({
    htmlFor: 'username',
  })

  expect(LabelContextConsumer).toHaveBeenReceived({
    htmlFor: 'username',
  })
})

test('htmlFor is null by default', () => {
  renderProvider({})

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

test('id is null by default', () => {
  renderProvider({})

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

test('optional is false by default', () => {
  renderProvider({})

  expect(LabelContextConsumer).toHaveBeenReceived({
    optional: false,
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

test('disabled is false by default', () => {
  renderProvider({})

  expect(LabelContextConsumer).toHaveBeenReceived({
    disabled: false,
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

test('invalid is false by default', () => {
  renderProvider({})

  expect(LabelContextConsumer).toHaveBeenReceived({
    invalid: false,
  })
})
