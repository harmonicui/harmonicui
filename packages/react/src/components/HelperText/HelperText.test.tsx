import React, { useRef } from 'react'
import { render } from '@testing-library/react'
import { HelperText } from './HelperText'
import { HelperTextContextProvider, HelperTextContract } from '../../contexts'

function getHelperText(element = 'div') {
  return container.querySelector(element)
}

test('should have a proper name', () => {
  expect(HelperText).toHaveBeenNamed('HelperText')
})

describe('rendering', () => {
  test('renders a div element by default', () => {
    render(
      <HelperTextContextProvider value={{} as HelperTextContract}>
        <HelperText>Something that might help!</HelperText>,
      </HelperTextContextProvider>,
    )

    expect(getHelperText()).toBeInTheDocument()
    expect(getHelperText()).toHaveTextContent('Something that might help!')
  })

  test('can be rendered as an arbitrary element', () => {
    render(
      <HelperTextContextProvider value={{} as HelperTextContract}>
        <HelperText as="span">Something that might help!</HelperText>,
      </HelperTextContextProvider>,
    )

    expect(getHelperText('span')).toBeInTheDocument()
    expect(getHelperText('span')).toHaveTextContent(
      'Something that might help!',
    )
  })

  test('forwards uncontrolled props to the inner element', () => {
    render(
      <HelperTextContextProvider value={{} as HelperTextContract}>
        <HelperText dir="rtl" data-test-id="test-id" className="class-name">
          Something that might help!
        </HelperText>
        ,
      </HelperTextContextProvider>,
    )

    expect(getHelperText()).toHaveClass('class-name')
    expect(getHelperText()).toHaveAttribute('dir', 'rtl')
    expect(getHelperText()).toHaveAttribute('data-test-id', 'test-id')
  })
})

test('consumes ref from HelperTextContext', () => {
  let ref: HelperTextContract['ref'] = { current: null }

  function Wrapper() {
    ref = useRef<HelperTextContract['ref']['current']>(null)

    return (
      <HelperTextContextProvider
        value={{ ref, id: 'helper-id' } as HelperTextContract}
      >
        <HelperText>Something that might help!</HelperText>,
      </HelperTextContextProvider>
    )
  }

  render(<Wrapper />)

  expect(ref.current).not.toBeNull()
  expect(ref.current?.id).toEqual('helper-id')
})

describe('id attribute', () => {
  test('consumes id from HelperTextContext', () => {
    render(
      <HelperTextContextProvider
        value={{ id: 'helper-text-id' } as HelperTextContract}
      >
        <HelperText>Something that might help!</HelperText>,
      </HelperTextContextProvider>,
    )

    expect(getHelperText()).toHaveAttribute('id', 'helper-text-id')
  })

  test('id should not be overridable by user', () => {
    render(
      <HelperTextContextProvider
        value={{ id: 'context' } as HelperTextContract}
      >
        <HelperText id="props">Something that might help!</HelperText>,
      </HelperTextContextProvider>,
    )

    expect(getHelperText()).toHaveAttribute('id', 'context')
  })
})

describe('visibility control', () => {
  test('consumes hidden state from HelperTextContext', () => {
    render(
      <HelperTextContextProvider value={{ hidden: true } as HelperTextContract}>
        <HelperText>Something that might help!</HelperText>,
      </HelperTextContextProvider>,
    )

    expect(getHelperText()).not.toBeVisible()
  })

  test('visibility should not be controllable by user', () => {
    render(
      <HelperTextContextProvider
        value={{ hidden: false } as HelperTextContract}
      >
        <HelperText hidden>Something that might help!</HelperText>,
      </HelperTextContextProvider>,
    )

    expect(getHelperText()).toBeVisible()
  })
})
