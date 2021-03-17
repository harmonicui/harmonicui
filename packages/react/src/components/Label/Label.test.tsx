import React from 'react'
import { Label } from './Label'
import { render } from '@testing-library/react'
import { LabelContextProvider } from '../../contexts'
import { LabelContract } from '@harmonicui/contracts'
import { suppressUnperformedContractWarning } from '../../test-utils'

function renderProvider (context?: Partial<LabelContract>) {
  function Provider () {
    return (
      <LabelContextProvider value={context ?? {}}>
        <Label/>
      </LabelContextProvider>
    )
  }

  return render(<Provider/>)
}

function getLabel () {
  return document.querySelector('label')
}

test('renders a label element',
  suppressUnperformedContractWarning(() => {
    render(<Label/>)
    expect(getLabel()).not.toBeNull()
  }),
)

test('render children content',
  suppressUnperformedContractWarning(() => {
    render(<Label>hello world!</Label>)
    expect(getLabel()).toHaveTextContent('hello world!')
  }),
)

test('consumes htmlFor property from LabelContext', () => {
  renderProvider({ htmlFor: 'username' })
  expect(getLabel()).toHaveAttribute('for', 'username')
})

test('does not render htmlFor property if not provided through context',
  suppressUnperformedContractWarning(() => {
    render(<Label/>)
    expect(getLabel()).not.toHaveAttribute('for')
  }),
)

test('consumes id from LabelContext', () => {
  renderProvider({ id: 'username-label' })
  expect(getLabel()).toHaveAttribute('id', 'username-label')
})

test('does not render id property if not provided through context',
  suppressUnperformedContractWarning(() => {
    render(<Label/>)
    expect(getLabel()).not.toHaveAttribute('id')
  }),
)

test('should pass uncontrolled props to label element',
  suppressUnperformedContractWarning(() => {
    render(<Label dir="rtl" lang="en" data-test-id="test"/>)
    expect(getLabel()).toHaveAttribute('dir', 'rtl')
    expect(getLabel()).toHaveAttribute('lang', 'en')
    expect(getLabel()).toHaveAttribute('data-test-id', 'test')
  }),
)
