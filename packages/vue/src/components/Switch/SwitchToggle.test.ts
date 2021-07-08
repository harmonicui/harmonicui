import { computed, ref } from 'vue'
import { fireEvent } from '@testing-library/vue'
import { renderInlineComponent } from '../../test-utils'
import {
  provideSwitchToggleContext,
  SwitchToggleContract,
} from '../../contexts'
import SwitchToggle from './SwitchToggle'

function getSwitchToggle() {
  return container.querySelector('button')
}

function renderTemplate(
  template: string,
  contextValue: Partial<SwitchToggleContract> = {},
) {
  return renderInlineComponent({
    template,
    components: {
      SwitchToggle,
    },
    setup() {
      provideSwitchToggleContext(contextValue as SwitchToggleContract)
    },
  })
}

test('should have a proper name', () => {
  expect(SwitchToggle).toHaveBeenNamed('SwitchToggle')
})

describe('rendering', () => {
  test('renders an button element', () => {
    renderTemplate(`
      <SwitchToggle/>
  `)

    expect(getSwitchToggle()).toBeInTheDocument()
  })

  test('renders default slot content inside SwitchToggle element', () => {
    renderTemplate(`
      <SwitchToggle>
          Username
      </SwitchToggle>
    `)

    expect(getSwitchToggle()).toHaveTextContent('Username')
  })

  test('can be render as a div', () => {
    renderTemplate(`
      <SwitchToggle as="div">
        Inner content!
      </SwitchToggle>
    `)
    expect(container.querySelector('div')).not.toBeNull()
    expect(container.querySelector('div')).toHaveTextContent('Inner content!')
  })

  test('forwards attrs to the button element', () => {
    renderTemplate(`
      <SwitchToggle dir='rtl' name='username' data-test-id='test-id' class='class-name' />
  `)

    expect(getSwitchToggle()).toHaveAttribute('dir', 'rtl')
    expect(getSwitchToggle()).toHaveAttribute('name', 'username')
    expect(getSwitchToggle()).toHaveAttribute('data-test-id', 'test-id')
    expect(getSwitchToggle()).toHaveClass('class-name')
  })
})

test('consumes tabindex from SwitchToggleContext', () => {
  renderTemplate(
    `
    <SwitchToggle />
  `,
    {
      tabindex: '0',
    },
  )
  expect(getSwitchToggle()).toHaveAttribute('tabindex', '0')
})

test('consumes ref from SwitchToggleContext', () => {
  const SwitchToggleRef = ref<SwitchToggleContract['ref']['value']>(null)

  renderTemplate(
    `
    <SwitchToggle dir='rtl' name='username' data-test-id='test-id' />
  `,
    {
      ref: SwitchToggleRef,
      id: 'SwitchToggle',
    },
  )

  expect(SwitchToggleRef.value).not.toBeNull()
  expect(SwitchToggleRef.value?.id).toEqual('SwitchToggle')
})

test('consumes and updates the modelValue provided by the SwitchToggleContext', async () => {
  const modelValue = ref<SwitchToggleContract['modelValue']['value']>(true)
  const toggleValue: SwitchToggleContract['toggleValue'] = () => {
    modelValue.value = !modelValue.value
  }

  const { getByTestId } = renderTemplate(
    `
      <SwitchToggle data-testid='SwitchToggle' />
    `,
    {
      modelValue: computed(() => modelValue.value),
      toggleValue,
    },
  )

  await fireEvent.click(getByTestId('SwitchToggle'))

  expect(modelValue.value).toEqual(false)

  await fireEvent.click(getByTestId('SwitchToggle'))

  expect(modelValue.value).toEqual(true)
})

describe('role attribute', () => {
  test('consumes the role provided by SwitchToggleContext', () => {
    renderTemplate(
      `
      <SwitchToggle />
    `,
      {
        role: 'switch',
      },
    )
    expect(getSwitchToggle()).toHaveAttribute('role', 'switch')
  })

  test('role should not be overridable by user', () => {
    renderTemplate(
      `
      <SwitchToggle role='button' />
    `,
      {
        role: 'switch',
      },
    )

    expect(getSwitchToggle()).toHaveAttribute('role', 'switch')
  })
})

describe('id attribute', () => {
  test('consumes the id provided from SwitchToggleContext', () => {
    renderTemplate(
      `
      <SwitchToggle />
    `,
      {
        id: 'SwitchToggle-id',
      },
    )

    expect(getSwitchToggle()).toHaveAttribute('id', 'SwitchToggle-id')
  })

  test('id should not be overridable by user', () => {
    renderTemplate(
      `
      <SwitchToggle id='id-from-props' />
    `,
      {
        id: 'id-from-context',
      },
    )

    expect(getSwitchToggle()).toHaveAttribute('id', 'id-from-context')
  })
})

describe('disabled attribute', () => {
  test('consumes disabled attribute from SwitchToggleContext', () => {
    renderTemplate('<SwitchToggle disabled />', { disabled: true })

    expect(getSwitchToggle()).toBeDisabled()
  })

  test('disabled attribute should not be overridable by user', () => {
    renderTemplate('<SwitchToggle disabled />', { disabled: false })

    expect(getSwitchToggle()).not.toBeDisabled()
  })
})

describe('aria-* attributes', () => {
  test('consumes aria-describedby attribute from SwitchToggleContext', () => {
    renderTemplate('<SwitchToggle /> ', {
      'aria-describedby': computed(() => 'description-id'),
    })
    expect(getSwitchToggle()).toHaveAttribute(
      'aria-describedby',
      'description-id',
    )
  })

  test('aria-describedby attribute should not be overridable by user', () => {
    renderTemplate('<SwitchToggle aria-describedby="props" /> ', {
      'aria-describedby': computed(() => 'context'),
    })

    expect(getSwitchToggle()).toHaveAttribute('aria-describedby', 'context')
  })

  test('consumes aria-checked attribute from SwitchToggleContext', () => {
    renderTemplate('<SwitchToggle /> ', {
      'aria-checked': computed(() => true),
    })
    expect(getSwitchToggle()).toHaveAttribute('aria-checked', 'true')
  })

  test('aria-checked attribute should not be overridable by user', () => {
    renderTemplate('<SwitchToggle aria-checked="true" /> ', {
      'aria-checked': computed(() => false),
    })

    expect(getSwitchToggle()).toHaveAttribute('aria-checked', 'false')
  })

  test('consumes aria-labelledby attribute from SwitchToggleContext', () => {
    renderTemplate('<SwitchToggle /> ', {
      'aria-labelledby': computed(() => 'label-id'),
    })
    expect(getSwitchToggle()).toHaveAttribute('aria-labelledby', 'label-id')
  })

  test('aria-labelledby attribute should not be overridable by user', () => {
    renderTemplate('<SwitchToggle labelledby="props" /> ', {
      'aria-labelledby': computed(() => 'context'),
    })

    expect(getSwitchToggle()).toHaveAttribute('aria-labelledby', 'context')
  })
})
