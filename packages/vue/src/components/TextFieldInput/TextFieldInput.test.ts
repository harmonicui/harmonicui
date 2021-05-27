import { computed, nextTick, ref } from 'vue'
import { fireEvent } from '@testing-library/vue'
import { renderInlineComponent } from '../../test-utils'
import {
  provideTextFieldInputContext,
  TextFieldInputContract,
} from '../../contexts'
import TextFieldInput from './TextFieldInput'

function getInput() {
  return container.querySelector('input')
}

function renderTemplate(
  template: string,
  contextValue: Partial<TextFieldInputContract> = {},
) {
  return renderInlineComponent({
    template,
    components: {
      TextFieldInput,
    },
    setup() {
      provideTextFieldInputContext(contextValue as TextFieldInputContract)
    },
  })
}

test('should have a proper name', () => {
  expect(TextFieldInput).toHaveBeenNamed('TextFieldInput')
})

describe('rendering', () => {
  test('renders an input element', () => {
    renderTemplate(`
      <TextFieldInput />
  `)

    expect(getInput()).toBeInTheDocument()
  })

  test('forwards attrs to the input element', () => {
    renderTemplate(`
      <TextFieldInput dir='rtl' name='username' data-test-id='test-id' class='class-name' />
  `)

    expect(getInput()).toHaveAttribute('dir', 'rtl')
    expect(getInput()).toHaveAttribute('name', 'username')
    expect(getInput()).toHaveAttribute('data-test-id', 'test-id')
    expect(getInput()).toHaveClass('class-name')
  })
})

test('consumes ref from TextFieldInputContext', () => {
  const inputRef = ref<TextFieldInputContract['ref']['value']>(null)

  renderTemplate(
    `
    <TextFieldInput dir='rtl' name='username' data-test-id='test-id' />
  `,
    {
      ref: inputRef,
      id: 'input',
    },
  )

  expect(inputRef.value).not.toBeNull()
  expect(inputRef.value?.id).toEqual('input')
})

test('consumes and updates the value provided by the TextFieldInputContext', async () => {
  const value = ref<TextFieldInputContract['value']['value']>('initial value')
  const setValue: TextFieldInputContract['setValue'] = newValue => {
    value.value = newValue
  }

  const { getByTestId } = renderTemplate(
    `
    <TextFieldInput data-testid='input' />
  `,
    {
      value: computed(() => value.value),
      setValue,
    },
  )

  expect(getInput()).toHaveValue('initial value')

  await fireEvent.update(getByTestId('input'), 'updated!')
  expect(value.value).toEqual('updated!')
  expect(getInput()).toHaveValue('updated!')

  value.value = 'updated again!'
  await nextTick()
  expect(getByTestId('input')).toHaveValue('updated again!')
})

describe('id attribute', () => {
  test('consumes the id provided from TextFieldInputContext', () => {
    renderTemplate(
      `
      <TextFieldInput />
    `,
      {
        id: 'input-id',
      },
    )

    expect(getInput()).toHaveAttribute('id', 'input-id')
  })

  test('id should not be overridable by user', () => {
    renderTemplate(
      `
      <TextFieldInput id='id-from-props' />
    `,
      {
        id: 'id-from-context',
      },
    )

    expect(getInput()).toHaveAttribute('id', 'id-from-context')
  })
})

describe('disabled attribute', () => {
  test('consumes disabled attribute from TextFieldInputContext', () => {
    renderTemplate('<TextFieldInput disabled />', { disabled: true })

    expect(getInput()).toBeDisabled()
  })

  test('disabled attribute should not be overridable by user', () => {
    renderTemplate('<TextFieldInput disabled />', { disabled: false })

    expect(getInput()).not.toBeDisabled()
  })
})

describe('required attribute', () => {
  test('consumes required attribute from TextFieldInputContext', () => {
    renderTemplate('<TextFieldInput />', { required: true })

    expect(getInput()).toBeRequired()
  })

  test('required attribute should not be overridable by user', () => {
    renderTemplate('<TextFieldInput required />', { required: false })

    expect(getInput()).not.toBeRequired()
  })
})

describe('aria-* attributes', () => {
  test('consumes aria-invalid attribute from TextFieldInputContext', () => {
    renderTemplate('<TextFieldInput /> ', { 'aria-invalid': true })
    expect(getInput()).toHaveAttribute('aria-invalid')
  })

  test('aria-invalid attribute should not be overridable by user', () => {
    renderTemplate('<TextFieldInput aria-invalid /> ', {
      'aria-invalid': undefined,
    })

    expect(getInput()).not.toHaveAttribute('aria-invalid')
  })

  test('consumes aria-errormessage attribute from TextFieldInputContext', () => {
    renderTemplate('<TextFieldInput /> ', {
      'aria-errormessage': computed(() => 'errormessage-id'),
    })
    expect(getInput()).toHaveAttribute('aria-errormessage', 'errormessage-id')
  })

  test('aria-errormessage attribute should not be overridable by user', () => {
    renderTemplate('<TextFieldInput aria-errormessage="props" /> ', {
      'aria-errormessage': computed(() => 'context'),
    })

    expect(getInput()).toHaveAttribute('aria-errormessage', 'context')
  })

  test('consumes aria-describedby attribute from TextFieldInputContext', () => {
    renderTemplate('<TextFieldInput /> ', {
      'aria-describedby': computed(() => 'description-id'),
    })
    expect(getInput()).toHaveAttribute('aria-describedby', 'description-id')
  })

  test('aria-describedby attribute should not be overridable by user', () => {
    renderTemplate('<TextFieldInput aria-describedby="props" /> ', {
      'aria-describedby': computed(() => 'context'),
    })

    expect(getInput()).toHaveAttribute('aria-describedby', 'context')
  })
})
