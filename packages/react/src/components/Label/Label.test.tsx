import React, { useRef } from 'react'
import { render } from '@testing-library/react'
import { LabelContextProvider, LabelContract } from '../../contexts'
import { Label } from './Label'

function getLabel () {
  return container.querySelector('label')
}

test('should have a proper name', () => {
  expect(Label).toHaveBeenNamed('Label')
})

describe('rendering', () => {
  test('renders a label element', () => {
    render(
      <LabelContextProvider value={{} as LabelContract}>
        <Label/>
      </LabelContextProvider>,
    )

    expect(getLabel()).toBeInTheDocument()
  })

  test('renders children content inside label element', () => {
    render(
      <LabelContextProvider value={{} as LabelContract}>
        <Label>Username</Label>
      </LabelContextProvider>,
    )

    expect(getLabel()).toHaveTextContent('Username')
  })

  test('can be rendered as an arbitrary element', () => {
    render(
      <LabelContextProvider value={{} as LabelContract}>
        <Label as="span">Username</Label>
      </LabelContextProvider>,
    )

    expect(container.querySelector('span')).toHaveTextContent('Username')
  })

  test('forwards attrs to the label element', () => {
    render(
      <LabelContextProvider value={{} as LabelContract}>
        <Label dir="rtl" data-test-id="test-id" className="class-name">
          Username
        </Label>
      </LabelContextProvider>,
    )

    expect(getLabel()).toHaveClass('class-name')
    expect(getLabel()).toHaveAttribute('dir', 'rtl')
    expect(getLabel()).toHaveAttribute('data-test-id', 'test-id')
  })
})

test('consumes ref from LabelContext', () => {
  let ref: LabelContract['ref'] = { current: null }

  function Wrapper () {
    ref = useRef<LabelContract['ref']['current']>(null)

    return (
      <LabelContextProvider value={{ ref, id: 'label-id' } as LabelContract}>
        <Label>
          Something that might help!
        </Label>,
      </LabelContextProvider>
    )
  }

  render(<Wrapper/>)

  expect(ref.current).not.toBeNull()
  expect(ref.current?.id).toEqual('label-id')
})

describe('id attribute', () => {
  test('consumes the id form LabelContext', () => {
    render(
      <LabelContextProvider value={{ id: 'label-id' } as LabelContract}>
        <Label>Username</Label>
      </LabelContextProvider>,
    )

    expect(getLabel()).toHaveAttribute('id', 'label-id')
  })

  test('id should not be overridable by user', () => {
    render(
      <LabelContextProvider value={{ id: 'context' } as LabelContract}>
        <Label id="props">Username</Label>
      </LabelContextProvider>,
    )

    expect(getLabel()).toHaveAttribute('id', 'context')
  })
})

describe('for attribute', () => {
  test('consumes for property from LabelContext', () => {
    render(
      <LabelContextProvider value={{ htmlFor: 'dummy-input-id' } as LabelContract}>
        <Label>Username</Label>
      </LabelContextProvider>,
    )

    expect(getLabel()).toHaveAttribute('for', 'dummy-input-id')
  })

  test('for attribute should not be modifiable by user', () => {
    render(
      <LabelContextProvider value={{ htmlFor: 'context' } as LabelContract}>
        <Label htmlFor="props">Username</Label>
      </LabelContextProvider>,
    )

    expect(getLabel()).toHaveAttribute('for', 'context')
  })
})

describe('data-is attribute', () => {
  test('consumes data-is from LabelContext', () => {
    render(
      <LabelContextProvider value={{ 'data-is': 'invalid disabled' } as LabelContract}>
        <Label>Username</Label>
      </LabelContextProvider>,
    )

    expect(getLabel()).toHaveAttribute('data-is', 'invalid disabled')
  })

  test('data-is attribute should not be modifiable by user', () => {
    render(
      <LabelContextProvider value={{ 'data-is': 'context' } as LabelContract}>
        <Label data-is="props">Username</Label>
      </LabelContextProvider>,
    )

    expect(getLabel()).toHaveAttribute('data-is', 'context')
  })
})
