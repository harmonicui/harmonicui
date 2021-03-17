import { renderComponent, renderInlineComponent, suppressUnperformedContractWarning } from '../../test-utils'
import HelperText from './HelperText'
import { HelperTextContract } from '@harmonicui/contracts'
import { provideHelperTextContext } from '../../contexts'

function getHelperText () {
  return document.querySelector('span')
}

test('renders a span element',
  suppressUnperformedContractWarning(() => {
    renderComponent(HelperText)
    expect(getHelperText()).not.toBeNull()
  }),
)

test('renders children content',
  suppressUnperformedContractWarning(() => {
    renderInlineComponent({
      template: `
        <HelperText>
        hello <span>world!</span>
        </HelperText>
      `,
      components: { HelperText },
    })

    expect(getHelperText()).toHaveTextContent('hello world!')
  }),
)

function renderHelperTextWithProvider (context: Partial<HelperTextContract>) {
  renderInlineComponent({
    template: '<HelperText />',
    components: { HelperText },
    setup () {
      provideHelperTextContext(context)
    },
  })
}

test('consumes id from HelperTextContext', () => {
  renderHelperTextWithProvider({ id: 'description-id' })
  expect(getHelperText()).toHaveAttribute('id', 'description-id')
})

test('does not render id if not provided through HelperTextContext', () => {
  renderHelperTextWithProvider({})
  expect(getHelperText()).not.toHaveAttribute('id')
})

test('should be visible if HelperTextContext.hidden is false', () => {
  renderHelperTextWithProvider({ hidden: false })
  expect(getHelperText()).toBeVisible()
})

test('should not be visible if HelperTextContext.hidden is true', () => {
  renderHelperTextWithProvider({ hidden: true })
  expect(getHelperText()).not.toBeVisible()
})
