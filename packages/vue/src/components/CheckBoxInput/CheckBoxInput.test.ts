import { ref, computed } from 'vue'
import { fireEvent } from '@testing-library/vue'
import { renderInlineComponent } from '../../test-utils'
import {
  provideCheckBoxInputContext,
  CheckBoxInputContract,
} from '../../contexts'
import CheckBoxInput from './CheckBoxInput'

function getCheckBox() {
  return container.querySelector('input')
}

function renderTemplate(
  template: string,
  contextValue: Partial<CheckBoxInputContract> = {},
) {
  return renderInlineComponent({
    template,
    components: {
      CheckBoxInput,
    },
    setup() {
      provideCheckBoxInputContext(contextValue as CheckBoxInputContract)
    },
  })
}

test('should have a proper name', () => {
  expect(CheckBoxInput).toHaveBeenNamed('CheckBoxInput')
})

describe('rendering', () => {
  test('renders an input element', () => {
    renderTemplate(`
      <CheckBoxInput />
  `)

    expect(getCheckBox()).toBeInTheDocument()
  })

  test('must be a checkbox', () => {
    renderTemplate(`
      <CheckBoxInput />
    `)

    expect(getCheckBox()).toHaveAttribute('type', 'checkbox')
  })

  test('forwards attrs to the input element', () => {
    renderTemplate(`
      <CheckBoxInput dir="rtl" name="username" data-test-id="test-id" class="class-name" />
  `)

    expect(getCheckBox()).toHaveAttribute('dir', 'rtl')
    expect(getCheckBox()).toHaveAttribute('name', 'username')
    expect(getCheckBox()).toHaveAttribute('data-test-id', 'test-id')
    expect(getCheckBox()).toHaveClass('class-name')
  })
})

test('consumes ref from CheckBoxInputContext', () => {
  const inputRef = ref<CheckBoxInputContract['ref']['value']>(null)

  renderTemplate(
    `
    <CheckBoxInput dir="rtl" name="username" data-test-id="test-id" />
  `,
    {
      ref: inputRef,
      id: 'input',
    },
  )

  expect(inputRef.value).not.toBeNull()
  expect(inputRef.value?.id).toEqual('input')
})

describe('id attribute', () => {
  test('consumes the id provided from CheckBoxInputContext', () => {
    renderTemplate(
      `
      <CheckBoxInput />
    `,
      {
        id: 'input-id',
      },
    )

    expect(getCheckBox()).toHaveAttribute('id', 'input-id')
  })

  test('id should not be overridable by user', () => {
    renderTemplate(
      `
      <CheckBoxInput id="id-from-props" />
    `,
      {
        id: 'id-from-context',
      },
    )

    expect(getCheckBox()).toHaveAttribute('id', 'id-from-context')
  })
})

describe('disabled attribute', () => {
  test('consumes disabled attribute from CheckBoxInputContext', () => {
    renderTemplate('<CheckBoxInput disabled />', { disabled: true })

    expect(getCheckBox()).toBeDisabled()
  })

  test('disabled attribute should not be overridable by user', () => {
    renderTemplate('<CheckBoxInput disabled />', { disabled: false })

    expect(getCheckBox()).not.toBeDisabled()
  })
})

describe('indeterminate attribute', () => {
  test('consumes indeterminate attribute from CheckBoxInputContext', () => {
    renderTemplate('<CheckBoxInput />', { indeterminate: true })

    expect(getCheckBox()).toHaveAttribute('indeterminate.prop', 'true')
  })

  test('indeterminate attribute should not be overridable by user', () => {
    renderTemplate('<CheckBoxInput indeterminate.prop="true" />', {
      indeterminate: false,
    })

    expect(getCheckBox()).toHaveAttribute('indeterminate.prop', 'false')
  })
})

describe('value attribute', () => {
  test('consumes value attribute from CheckBoxInputContext', () => {
    renderTemplate('<CheckBoxInput />', {
      value: 'inputValue',
    })

    expect(getCheckBox()).toHaveAttribute('value', 'inputValue')
  })

  test('value attribute should not be overridable by user', () => {
    renderTemplate('<CheckBoxInput value = "propsValue" />', {
      value: 'contextValue',
    })

    expect(getCheckBox()).toHaveAttribute('value', 'contextValue')
  })

  test('consumes and updates the modelValue provided by the CheckBoxInputContext', async () => {
    const modelValue = ref<CheckBoxInputContract['modelValue']['value']>(false)
    const toggleValue: CheckBoxInputContract['toggleValue'] = () => {
      modelValue.value = !modelValue.value
    }
    const { getByTestId } = renderTemplate(
      '<CheckBoxInput data-testid="input" />',
      {
        modelValue: computed(() => modelValue.value),
        toggleValue,
      },
    )

    expect(getByTestId('input')).not.toBeChecked()
    await fireEvent.click(getByTestId('input'))

    expect(modelValue.value).toEqual(true)
    expect(getByTestId('input')).toBeChecked()

    await fireEvent.click(getByTestId('input'))

    expect(modelValue.value).toEqual(false)
    expect(getByTestId('input')).not.toBeChecked()
  })
})

describe('required attribute', () => {
  test('consumes required attribute from CheckBoxInputContext', () => {
    renderTemplate('<CheckBoxInput />', { required: true })

    expect(getCheckBox()).toBeRequired()
  })

  test('required attribute should not be overridable by user', () => {
    renderTemplate('<CheckBoxInput required />', { required: false })

    expect(getCheckBox()).not.toBeRequired()
  })
})

describe('aria-* attributes', () => {
  test('consumes aria-invalid attribute from CheckBoxInputContext', () => {
    renderTemplate('<CheckBoxInput /> ', { 'aria-invalid': true })
    expect(getCheckBox()).toHaveAttribute('aria-invalid')
  })

  test('aria-invalid attribute should not be overridable by user', () => {
    renderTemplate('<CheckBoxInput aria-invalid /> ', {
      'aria-invalid': undefined,
    })

    expect(getCheckBox()).not.toHaveAttribute('aria-invalid')
  })

  test('consumes aria-errormessage attribute from CheckBoxInputContext', () => {
    renderTemplate('<CheckBoxInput /> ', {
      'aria-errormessage': computed(() => 'errormessage-id'),
    })
    expect(getCheckBox()).toHaveAttribute(
      'aria-errormessage',
      'errormessage-id',
    )
  })

  test('aria-errormessage attribute should not be overridable by user', () => {
    renderTemplate('<CheckBoxInput aria-errormessage="props" /> ', {
      'aria-errormessage': computed(() => 'context'),
    })

    expect(getCheckBox()).toHaveAttribute('aria-errormessage', 'context')
  })

  test('consumes aria-describedby attribute from CheckBoxInputContext', () => {
    renderTemplate('<CheckBoxInput /> ', {
      'aria-describedby': computed(() => 'description-id'),
    })
    expect(getCheckBox()).toHaveAttribute('aria-describedby', 'description-id')
  })

  test('aria-describedby attribute should not be overridable by user', () => {
    renderTemplate('<CheckBoxInput aria-describedby="props" /> ', {
      'aria-describedby': computed(() => 'context'),
    })

    expect(getCheckBox()).toHaveAttribute('aria-describedby', 'context')
  })
})
