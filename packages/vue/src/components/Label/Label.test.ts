import { computed, ref } from 'vue'
import { renderInlineComponent } from '../../test-utils'
import { LabelContract, provideLabelContext } from '../../contexts'
import LabelComponent from './Label'

function getLabel() {
  return container.querySelector('label')
}

function renderTemplate(
  template: string,
  contextValue: Partial<LabelContract> = {},
) {
  return renderInlineComponent({
    template,
    components: { LabelComponent },
    setup() {
      provideLabelContext(contextValue as LabelContract)
    },
  })
}

test('should have a proper name', () => {
  expect(LabelComponent).toHaveBeenNamed('Label')
})

describe('rendering', () => {
  test('renders a label element', () => {
    renderTemplate(`
      <LabelComponent />
    `)

    expect(getLabel()).toBeInTheDocument()
  })

  test('renders default slot content inside label element', () => {
    renderTemplate(`
      <LabelComponent>Username</LabelComponent>
    `)

    expect(getLabel()).toHaveTextContent('Username')
  })

  test('forwards attrs to the label element', () => {
    renderTemplate(`
      <LabelComponent dir="rtl" data-test-id="test-id" class="class-name">
        Username
      </LabelComponent>
    `)

    expect(getLabel()).toHaveClass('class-name')
    expect(getLabel()).toHaveAttribute('dir', 'rtl')
    expect(getLabel()).toHaveAttribute('data-test-id', 'test-id')
  })
})

test('consumes ref from LabelContext', () => {
  const labelRef = ref<LabelContract['ref']['value']>(null)

  renderTemplate(
    `
    <LabelComponent>Username</LabelComponent>
  `,
    {
      ref: labelRef,
      id: 'label-id',
    },
  )

  expect(labelRef.value).not.toBeNull()
  expect(labelRef.value?.id).toEqual('label-id')
})

describe('id attribute', () => {
  test('consumes the id provided by LabelContext', () => {
    renderTemplate(
      `
    <LabelComponent>Username</LabelComponent>
  `,
      {
        id: 'label-id',
      },
    )

    expect(getLabel()).toHaveAttribute('id', 'label-id')
  })

  test('id should not be overridable by user', () => {
    renderTemplate(
      `
    <LabelComponent id="id-from-props">Username</LabelComponent>
  `,
      {
        id: 'id-from-context',
      },
    )

    expect(getLabel()).toHaveAttribute('id', 'id-from-context')
  })
})

describe('for attribute', () => {
  test('consumes for property from LabelContext', () => {
    renderTemplate(
      `
      <LabelComponent>Username</LabelComponent>
    `,
      {
        for: computed(() => 'dummy-input-id'),
      },
    )

    expect(getLabel()).toHaveAttribute('for', 'dummy-input-id')
  })

  test('for attribute should not be modifiable by user', () => {
    renderTemplate(
      `
      <LabelComponent id="id-from-props">Username</LabelComponent>
    `,
      {
        for: computed(() => 'id-from-context'),
      },
    )

    expect(getLabel()).toHaveAttribute('for', 'id-from-context')
  })
})

describe('data-is attribute', () => {
  test('consumes data-is from LabelContext', () => {
    renderTemplate(
      `
      <LabelComponent>Username</LabelComponent>
    `,
      {
        'data-is': 'invalid disabled',
      },
    )

    expect(getLabel()).toHaveAttribute('data-is', 'invalid disabled')
  })

  test('data-is attribute should not be modifiable by user', () => {
    renderTemplate(
      `
      <LabelComponent data-is="props">Username</LabelComponent>
    `,
      {
        'data-is': 'context',
      },
    )

    expect(getLabel()).toHaveAttribute('data-is', 'context')
  })
})
