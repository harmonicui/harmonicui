import { DefineComponent, nextTick, ref } from 'vue'
import { renderInlineComponent } from '../../test-utils'
import { fireEvent } from '@testing-library/vue'
import {
  AssertionsConfigurationOptions,
  CheckBoxAssertions,
} from './Assertions'
import {
  CheckBox,
  CheckBoxLabel,
  CheckBoxHelperText,
  CheckBoxInput,
  CheckBoxErrorMessage,
} from './index'

function getCheckBox() {
  return container.querySelector('div')
}

function renderTemplate(template: string, setup?: DefineComponent['setup']) {
  return renderInlineComponent({
    template,
    components: {
      CheckBox,
      CheckBoxErrorMessage,
      CheckBoxHelperText,
      CheckBoxInput,
      CheckBoxLabel,
    },
    setup,
  })
}

async function renderAndRunAssertions(
  template: string,
  assertionOptions: AssertionsConfigurationOptions = {},
) {
  renderTemplate(template)

  await nextTick()

  const assertions = new CheckBoxAssertions(assertionOptions)
  assertions.runAllAssertions()
}

test('should be named properly', () => {
  expect(CheckBox).toHaveBeenNamed('CheckBox')
})

describe('rendering', () => {
  test('should render as a render-less component by default', () => {
    expect(CheckBox).toBeRenderLessComponent()
    expect(CheckBox).toRendersDefaultSlotContent()
  })

  test('can be render as a div', () => {
    renderTemplate(`
      <CheckBox as='div'>
        Inner content!
      </CheckBox>
    `)

    expect(getCheckBox()).not.toBeNull()
    expect(getCheckBox()).toHaveTextContent('Inner content!')
  })

  test('forwards additional props to inner element if rendered div', () => {
    renderTemplate(`
      <CheckBox as='div' class='className' id='CheckBox'>
        Inner content!
      </CheckBox>
    `)

    expect(getCheckBox()).toHaveClass('className')
    expect(getCheckBox()).toHaveAttribute('id', 'CheckBox')
  })

  test('attrs should be handled manually to prevent "Extraneous non-props attributes" warning when rendering as fragment', () => {
    const spy = jest.spyOn(console, 'warn')

    renderTemplate(`
      <CheckBox as='div' class='className' id='CheckBox'>
        Inner content!
      </CheckBox>
    `)

    expect(spy).not.toHaveBeenCalled()
    spy.mockRestore()
  })

  test('rendering with CheckBoxInput, CheckBoxLabel, CheckBoxHelperText and CheckBoxErrorMessage components', async () => {
    await renderAndRunAssertions(`
      <CheckBox>
        <CheckBoxLabel>Username</CheckBoxLabel>
        <CheckBoxInput />
        <CheckBoxErrorMessage>Oops! something went wrong.</CheckBoxErrorMessage>
        <CheckBoxHelperText>Something that might help!</CheckBoxHelperText>
      </CheckBox>
    `)
  })
})

describe('states', () => {
  test('CheckBoxInput can be optional', async () => {
    await renderAndRunAssertions(
      `
      <CheckBox optional>
        <CheckBoxLabel>Username</CheckBoxLabel>
        <CheckBoxInput />
        <CheckBoxErrorMessage>Oops! something went wrong.</CheckBoxErrorMessage>
        <CheckBoxHelperText>Something that might help!</CheckBoxHelperText>
      </CheckBox>
    `,
      {
        states: ['optional'],
      },
    )
  })

  test('CheckBoxInput can be disabled', async () => {
    await renderAndRunAssertions(
      `
      <CheckBox disabled>
        <CheckBoxLabel>Username</CheckBoxLabel>
        <CheckBoxInput />
        <CheckBoxErrorMessage>Oops! something went wrong.</CheckBoxErrorMessage>
        <CheckBoxHelperText>Something that might help!</CheckBoxHelperText>
      </CheckBox>
    `,
      {
        states: ['disabled'],
      },
    )
  })

  test('CheckBoxInput can be indeterminate', async () => {
    await renderAndRunAssertions(
      `
      <CheckBox indeterminate>
        <CheckBoxLabel>Username</CheckBoxLabel>
        <CheckBoxInput />
        <CheckBoxErrorMessage>Oops! something went wrong.</CheckBoxErrorMessage>
        <CheckBoxHelperText>Something that might help!</CheckBoxHelperText>
      </CheckBox>
    `,
      {
        states: ['indeterminate'],
      },
    )
  })

  test("CheckBox's value may invalid", async () => {
    await renderAndRunAssertions(
      `
      <CheckBox invalid>
        <CheckBoxLabel>Username</CheckBoxLabel>
        <CheckBoxInput />
        <CheckBoxErrorMessage>Oops! something went wrong.</CheckBoxErrorMessage>
        <CheckBoxHelperText>Something that might help!</CheckBoxHelperText>
      </CheckBox>
    `,
      {
        states: ['invalid'],
      },
    )
  })

  test('multiple states can be applied to CheckBoxInput at the same time', async () => {
    await renderAndRunAssertions(
      `
      <CheckBox invalid disabled optional indeterminate>
        <CheckBoxLabel>Username</CheckBoxLabel>
        <CheckBoxInput />
        <CheckBoxErrorMessage>Oops! something went wrong.</CheckBoxErrorMessage>
        <CheckBoxHelperText>Something that might help!</CheckBoxHelperText>
      </CheckBox>
    `,
      {
        states: ['invalid', 'optional', 'disabled', 'indeterminate'],
      },
    )
  })

  test('should expose state props through default slot', async () => {
    const { getByTestId } = renderTemplate(`
      <CheckBox invalid disabled v-slot='{ invalid, disabled, optional, required }'>
        <span data-testid='disabled'>{{ disabled.toString() }}</span>
        <span data-testid='invalid'>{{ invalid.toString() }}</span>
        <span data-testid='required'>{{ required.toString() }}</span>
        <span data-testid='optional'>{{ optional.toString() }}</span>
      </CheckBox>
    `)

    expect(getByTestId('disabled')).toHaveTextContent('true')
    expect(getByTestId('invalid')).toHaveTextContent('true')
    expect(getByTestId('required')).toHaveTextContent('true')
    expect(getByTestId('optional')).toHaveTextContent('false')
  })
})

describe('v-model', () => {
  test('shares and controls the modelValue through CheckBoxInput context', async () => {
    const modelValue = ref(true)

    const { getByLabelText } = renderTemplate(
      `
      <CheckBox v-model="modelValue" >
        <CheckBoxLabel>Username</CheckBoxLabel>
        <CheckBoxInput />
      </CheckBox>
    `,
      () => ({ modelValue }),
    )

    await nextTick()

    const input = getByLabelText('Username')

    expect(input).toBeChecked()

    await fireEvent.click(input)

    expect(input).not.toBeChecked()
    expect(modelValue.value).toEqual(false)

    await fireEvent.click(input)

    expect(input).toBeChecked()
    expect(modelValue.value).toEqual(true)
  })
})

describe('aria-* attributes', () => {
  test('CheckBoxLabel loses for attribute if Input does not exists', async () => {
    await renderAndRunAssertions(
      `
      <CheckBox>
        <CheckBoxLabel>Username</CheckBoxLabel>
        <CheckBoxErrorMessage>Oops! something went wrong.</CheckBoxErrorMessage>
        <CheckBoxHelperText>Something that might help!</CheckBoxHelperText>
      </CheckBox>
    `,
      {
        ignoreAssertions: ['Input'],
      },
    )
  })

  test('CheckBoxInput loses the aria-describedby attribute if HelperText does not exists', async () => {
    await renderAndRunAssertions(
      `
      <CheckBox>
        <CheckBoxLabel>Username</CheckBoxLabel>
        <CheckBoxInput />
        <CheckBoxErrorMessage>Oops! something went wrong.</CheckBoxErrorMessage>
      </CheckBox>
    `,
      {
        ignoreAssertions: ['HelperText'],
      },
    )
  })

  test('CheckBoxInput loses the aria-errormessage attribute if ErrorMessage does not exists', async () => {
    await renderAndRunAssertions(
      `
      <CheckBox invalid>
        <CheckBoxLabel>Username</CheckBoxLabel>
        <CheckBoxInput />
        <CheckBoxHelperText>Something that might help!</CheckBoxHelperText>
      </CheckBox>
      `,
      {
        states: ['invalid'],
        ignoreAssertions: ['ErrorMessage'],
      },
    )
  })
})

describe('overriding IDs', () => {
  test('CheckBoxInput id should be overridable', async () => {
    await renderAndRunAssertions(
      `
      <CheckBox input-id="input-id">
        <CheckBoxLabel>Username</CheckBoxLabel>
        <CheckBoxInput />
        <CheckBoxErrorMessage>Oops! something went wrong.</CheckBoxErrorMessage>
        <CheckBoxHelperText>Something that might help!</CheckBoxHelperText>
      </CheckBox>
    `,
      {
        id: { input: 'input-id' },
      },
    )
  })

  test('CheckBoxLabel id should be overridable', async () => {
    await renderAndRunAssertions(
      `
      <CheckBox label-id="label-id">
        <CheckBoxLabel>Username</CheckBoxLabel>
        <CheckBoxInput />
        <CheckBoxErrorMessage>Oops! something went wrong.</CheckBoxErrorMessage>
        <CheckBoxHelperText>Something that might help!</CheckBoxHelperText>
      </CheckBox>
    `,
      {
        id: { label: 'label-id' },
      },
    )
  })

  test('CheckBoxHelperText id should be overridable', async () => {
    await renderAndRunAssertions(
      `
      <CheckBox helper-text-id="helper-text-id">
        <CheckBoxLabel>Username</CheckBoxLabel>
        <CheckBoxInput />
        <CheckBoxErrorMessage>Oops! something went wrong.</CheckBoxErrorMessage>
        <CheckBoxHelperText>Something that might help!</CheckBoxHelperText>
      </CheckBox>
    `,
      {
        id: { helperText: 'helper-text-id' },
      },
    )
  })

  test('CheckBoxErrorMessage id should be overridable', async () => {
    await renderAndRunAssertions(
      `
      <CheckBox error-message-id="error-message-id">
        <CheckBoxLabel>Username</CheckBoxLabel>
        <CheckBoxInput />
        <CheckBoxErrorMessage>Oops! something went wrong.</CheckBoxErrorMessage>
        <CheckBoxHelperText>Something that might help!</CheckBoxHelperText>
      </CheckBox>
    `,
      {
        id: { errorMessage: 'error-message-id' },
      },
    )
  })
})
