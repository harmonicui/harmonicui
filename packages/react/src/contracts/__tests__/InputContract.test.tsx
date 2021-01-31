// eslint-disable-next-line no-use-before-define
import React from 'react'
import { render } from '@testing-library/react'
import { createProvider } from '../../test-utils'
import { InputContext, InputContract } from '../InputContract'

const {
  renderProvider,
  consumer: InputContextConsumer,
  ConsumerComponent,
} = createProvider<InputContract>(InputContext, 'InputContext')

test('throws a warning and returns default values if no provider exists to perform the contract', () => {
  console.warn = jest.fn()

  const defaults = {
    id: null,
    value: null,
    updateValue: null,
    ariaDescribedby: null,
    required: true,
    disabled: false,
    invalid: false,
  }

  render(<ConsumerComponent/>)

  expect(console.warn).toHaveBeenCalledWith(
    expect.stringContaining('[ HarmonicUI: UnperformedContractWarning ]'),
  )
  expect(InputContextConsumer).toHaveBeenReceived(defaults)
})

test('the contract defines an id property', () => {
  renderProvider({
    id: 'email',
  })

  expect(InputContextConsumer).toHaveBeenReceived({
    id: 'email',
  })
})

test('id is null by default', () => {
  renderProvider({})

  expect(InputContextConsumer).toHaveBeenReceived({
    id: null,
  })
})

test('the contract defines an aria-errormessage property', () => {
  renderProvider({
    ariaErrormessage: 'error-message-id',
  })

  expect(InputContextConsumer).toHaveBeenReceived({
    ariaErrormessage: 'error-message-id',
  })
})

test('aria-errormessage is null by default', () => {
  renderProvider({})

  expect(InputContextConsumer).toHaveBeenReceived({
    ariaErrormessage: null,
  })
})

test('the contract defines an aria-describedBy property', () => {
  renderProvider({
    ariaDescribedby: 'hint-message-id',
  })

  expect(InputContextConsumer).toHaveBeenReceived({
    ariaDescribedby: 'hint-message-id',
  })
})

test('aria-errormessage is null by default', () => {
  renderProvider({})

  expect(InputContextConsumer).toHaveBeenReceived({
    ariaDescribedby: null,
  })
})

test('the contract defines a value property', () => {
  renderProvider({
    value: 'hello!',
  })

  expect(InputContextConsumer).toHaveBeenReceived({
    value: 'hello!',
  })
})

test('value is null by default', () => {
  renderProvider({})

  expect(InputContextConsumer).toHaveBeenReceived({
    value: null,
  })
})

test('the contract defines an updateValue method', () => {
  const mock = jest.fn()

  renderProvider({
    updateValue: mock,
  })

  expect(InputContextConsumer).toHaveBeenReceived({
    updateValue: mock,
  })
})

test('UpdateValue is null by default', () => {
  renderProvider({})

  expect(InputContextConsumer).toHaveBeenReceived({
    updateValue: null,
  })
})

test('the contract defines a required property', () => {
  renderProvider({ required: false })

  expect(InputContextConsumer).toHaveBeenReceived({
    required: false,
  })
})

test('required is true by default', () => {
  renderProvider({})

  expect(InputContextConsumer).toHaveBeenReceived({
    required: true,
  })
})

test('the contract defines a disabled property', () => {
  renderProvider({ disabled: true })

  expect(InputContextConsumer).toHaveBeenReceived({
    disabled: true,
  })
})

test('disabled is false by default', () => {
  renderProvider({})

  expect(InputContextConsumer).toHaveBeenReceived({
    disabled: false,
  })
})

test('the contract defines an invalid property', () => {
  renderProvider({ invalid: true })

  expect(InputContextConsumer).toHaveBeenReceived(
    { invalid: true })
})

test('invalid is false by default', () => {
  renderProvider({})

  expect(InputContextConsumer).toHaveBeenReceived({
    invalid: false,
  })
})
