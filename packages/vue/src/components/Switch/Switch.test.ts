import { DefineComponent, nextTick, ref } from 'vue'
import { renderInlineComponent } from '../../test-utils'
import { AssertionsConfigurationOptions, SwitchAssertions } from './Assertions'
import { fireEvent } from '@testing-library/vue'
import {
  Switch,
  SwitchHelperText,
  SwitchLabel,
  SwitchToggle,
  SwitchThumb,
} from './index'

function renderTemplate(template: string, setup?: DefineComponent['setup']) {
  return renderInlineComponent({
    template,
    components: {
      Switch,
      SwitchToggle,
      SwitchLabel,
      SwitchHelperText,
      SwitchThumb,
    },
    setup,
  })
}

function getSwitch() {
  return container.querySelector('div')
}

async function renderAndRunAssertions(
  template: string,
  assertionOptions: AssertionsConfigurationOptions = {},
) {
  renderTemplate(template)

  await nextTick()

  const assertions = new SwitchAssertions(assertionOptions)
  assertions.runAllAssertions()
}

test('should be named properly', () => {
  expect(Switch).toHaveBeenNamed('Switch')
})

describe('rendering', () => {
  test('should render as a render-less component by default', () => {
    expect(Switch).toBeRenderLessComponent()
    expect(Switch).toRendersDefaultSlotContent()
  })

  test('can be render as a div', () => {
    renderTemplate(`
      <Switch as='div'>
        Inner content!
      </Switch>
    `)

    expect(getSwitch()).not.toBeNull()
    expect(getSwitch()).toHaveTextContent('Inner content!')
  })

  test('forwards additional props to inner element if rendered div', () => {
    renderTemplate(`
      <Switch as='div' class='className' id='switch'>
        Inner content!
      </Switch>
    `)

    expect(getSwitch()).toHaveClass('className')
    expect(getSwitch()).toHaveAttribute('id', 'switch')
  })

  test('attrs should be handled manually to prevent "Extraneous non-props attributes" warning when rendering as fragment', () => {
    const spy = jest.spyOn(console, 'warn')

    renderTemplate(`
      <Switch class='className' id='switch'>
        Inner content!
      </Switch>
    `)

    expect(spy).not.toHaveBeenCalled()
    spy.mockRestore()
  })

  test('rendering with SwitchToggle, SwitchLabel , SwitchThumb and SwitchHelperText components', async () => {
    await renderAndRunAssertions(`
      <Switch>
        <SwitchLabel>Username</SwitchLabel>
        <SwitchToggle>
          <SwitchThumb />
        </SwitchToggle>
        <SwitchHelperText>Something that might help!</SwitchHelperText>
      </Switch>
    `)
  })
})

describe('states', () => {
  test('switch can be disabled', async () => {
    await renderAndRunAssertions(
      `
      <Switch disabled>
        <SwitchLabel>Username</SwitchLabel>
        <SwitchToggle >
          <SwitchThumb />
        </SwitchToggle>
        <SwitchHelperText>Something that might help!</SwitchHelperText>
      </Switch>
    `,
      {
        states: ['disabled'],
      },
    )
  })

  test('should expose state props through default slot', async () => {
    const { getByTestId } = renderTemplate(`
      <Switch disabled v-slot='{ disabled }'>
        <span data-testid='disabled'>{{ disabled.toString() }}</span>
      </Switch>
    `)

    expect(getByTestId('disabled')).toHaveTextContent('true')
  })
})

describe('v-model', () => {
  test('shares and controls the modelValue through SwitchToggle context', async () => {
    const modelValue = ref(false)

    const { getByLabelText, getByTestId } = renderTemplate(
      `
      <Switch v-model="modelValue" >
        <SwitchLabel >Username</SwitchLabel>
        <SwitchToggle>
          <SwitchThumb data-testid='thumb'/>
        </SwitchToggle>
      </Switch>
    `,
      () => ({ modelValue }),
    )

    await nextTick()

    const toggle = getByLabelText('Username')
    const thumb = getByTestId('thumb')

    await fireEvent.click(toggle)

    expect(modelValue.value).toEqual(true)
    expect(toggle).toHaveAttribute('aria-checked', 'true')
    expect(thumb).toHaveAttribute('data-is', 'on')

    await fireEvent.click(toggle)

    expect(modelValue.value).toEqual(false)
    expect(toggle).toHaveAttribute('aria-checked', 'false')
    expect(thumb).toHaveAttribute('data-is', 'off')
  })
})

describe('Keyboard interactions', () => {
  test('should be possible to toggle the Switch with Space', async () => {
    const modelValue = ref(false)

    const { getByLabelText } = renderTemplate(
      `
      <Switch v-model="modelValue" >
        <SwitchLabel>Username</SwitchLabel>
        <SwitchToggle>
          <SwitchThumb />
        </SwitchToggle>
      </Switch>
    `,
      () => ({ modelValue }),
    )

    await nextTick()
    const toggle = getByLabelText('Username')

    fireEvent.focus(toggle)
    fireEvent.keyDown(toggle, { key: 'Space' })

    await nextTick()

    expect(modelValue.value).toBe(true)
  })
})

describe('aria-* attributes', () => {
  test('SwitchLabel loses for attribute if SwitchToggle does not exists', async () => {
    await renderAndRunAssertions(
      `
      <Switch>
        <SwitchLabel>Username</SwitchLabel>
        <SwitchThumb />
        <SwitchHelperText>Something that might help!</SwitchHelperText>
      </Switch>
    `,
      {
        ignoreAssertions: ['Toggle'],
      },
    )
  })

  test('SwitchToggle loses the aria-describedby attribute if HelperText does not exists', async () => {
    await renderAndRunAssertions(
      `
      <Switch>
        <SwitchLabel>Username</SwitchLabel>
        <SwitchToggle>
          <SwitchThumb />
        </SwitchToggle>
      </Switch>
    `,
      {
        ignoreAssertions: ['HelperText'],
      },
    )
  })
})

describe('overriding IDs', () => {
  test('SwitchToggle id should be overridable', async () => {
    await renderAndRunAssertions(
      `
      <Switch toggle-id='toggle-id'>
        <SwitchLabel>Username</SwitchLabel>
        <SwitchToggle>
          <SwitchThumb />
        </SwitchToggle>
        <SwitchHelperText>Something that might help!</SwitchHelperText>
      </Switch>
    `,
      {
        id: { toggle: 'toggle-id' },
      },
    )
  })

  test('SwitchLabel id should be overridable', async () => {
    await renderAndRunAssertions(
      `
      <Switch label-id='label-id'>
        <SwitchLabel>Username</SwitchLabel>
          <SwitchToggle>
            <SwitchThumb />
          </SwitchToggle>
        <SwitchHelperText>Something that might help!</SwitchHelperText>
      </Switch>
    `,
      {
        id: { label: 'label-id' },
      },
    )
  })

  test('SwitchHelperText id should be overridable', async () => {
    await renderAndRunAssertions(
      `
      <Switch helper-text-id='HelperText-id'>
        <SwitchLabel>Username</SwitchLabel>
        <SwitchToggle>
          <SwitchThumb />
        </SwitchToggle>
        <SwitchHelperText>Something that might help!</SwitchHelperText>
      </Switch>
    `,
      {
        id: { helperText: 'HelperText-id' },
      },
    )
  })
})
