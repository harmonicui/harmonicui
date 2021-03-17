import { renderComponent, renderInlineComponent, suppressUnperformedContractWarning } from '../../test-utils'
import { provideLabelContext } from '../../contexts'
import { LabelContract } from '@harmonicui/contracts'
import LabelComponent from './Label'

function getLabel () {
  return document.querySelector('label')
}

function renderLabelWithContextProvider (context: Partial<LabelContract>) {
  renderInlineComponent({
    template: '<LabelComponent />',
    components: { LabelComponent },
    setup () {
      provideLabelContext(context)
    },
  })
}

test('renders a label element',
  suppressUnperformedContractWarning(() => {
    renderComponent(LabelComponent)
    expect(getLabel()).not.toBeNull()
  }),
)

test('renders default slot content',
  suppressUnperformedContractWarning(() => {
    renderInlineComponent({
      template: `
        <LabelComponent>
        hello <span>world!</span>
        </LabelComponent>
      `,
      components: { LabelComponent },
    })

    expect(getLabel()).toHaveTextContent('hello world!')
  }),
)

test('consumes id from LabelContext', () => {
  renderLabelWithContextProvider({ id: 'label-id' })
  expect(getLabel()).toHaveAttribute('id', 'label-id')
})

test('does not render id if not provided through LabelContext', () => {
  renderLabelWithContextProvider({})
  expect(getLabel()).not.toHaveAttribute('id')
})

test('consumes htmlFor from LabelContext', () => {
  renderLabelWithContextProvider({ htmlFor: 'dummy-input-id' })
  expect(getLabel()).toHaveAttribute('for', 'dummy-input-id')
})

test('does not render htmlFor if not provided through LabelContext', () => {
  renderLabelWithContextProvider({})
  expect(getLabel()).not.toHaveAttribute('for')
})

test('should pass uncontrolled props to label element',
  suppressUnperformedContractWarning(() => {
    renderInlineComponent({
      template: `
        <LabelComponent dir="rtl" lang="en" data-test-id="test"/>
      `,
      components: { LabelComponent },
    })

    expect(getLabel()).toHaveAttribute('dir', 'rtl')
    expect(getLabel()).toHaveAttribute('lang', 'en')
    expect(getLabel()).toHaveAttribute('data-test-id', 'test')
  }),
)

test('user must not be able to modify controlled props', () => {
  renderInlineComponent({
    template: '<LabelComponent id="user" for="user"/>',
    components: { LabelComponent },

    setup () {
      provideLabelContext({
        id: 'context',
        htmlFor: 'context',
      })
    },
  })

  expect(getLabel()).toHaveAttribute('id', 'context')
  expect(getLabel()).toHaveAttribute('for', 'context')
})
