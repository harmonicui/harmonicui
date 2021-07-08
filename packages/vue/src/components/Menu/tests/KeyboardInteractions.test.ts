import { nextTick } from 'vue'
import { click, focus, Keyboard, press, type } from '../../../test-utils'
import {
  assertActiveMenuItemIs,
  assertMenuButtonIsFocused,
  assertMenuIsClosed,
  assertMenuIsFullyAccessible,
  assertMenuIsOpen,
  assertNoActiveMenuItem,
  getMenuButton,
  render,
} from './test-utils'

describe('`Space` key', () => {
  test('`Space` key should open the menu', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem as='a'>Settings</MenuItem>
          <MenuItem as='a'>Profile</MenuItem>
          <MenuItem as='a'>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()
    assertMenuIsClosed()

    await focus(getMenuButton())
    assertMenuButtonIsFocused()

    await press(Keyboard.Space)
    assertMenuIsOpen()
    assertActiveMenuItemIs(0)
  })

  test('`Space` key should not open the menu when MenuButton is disabled', async () => {
    render(`
      <Menu>
        <MenuButton disabled>Options</MenuButton>
        <MenuList>
          <MenuItem as='a'>Settings</MenuItem>
          <MenuItem as='a'>Profile</MenuItem>
          <MenuItem as='a'>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()
    assertMenuIsClosed()

    await focus(getMenuButton())
    await press(Keyboard.Space)
    assertMenuIsClosed()
  })

  test('`Space` key should open the menu and focus on the first non-disabled MenuItem', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem as='a' disabled>Settings</MenuItem>
          <MenuItem as='a'>Profile</MenuItem>
          <MenuItem as='a'>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible({ disabledItems: [0] })

    await focus(getMenuButton())
    assertMenuButtonIsFocused()

    await press(Keyboard.Space)
    assertMenuIsOpen()
    assertActiveMenuItemIs(1)
  })

  test('`Space` key should open the menu, skip all disabled MenuItems and focus on the first non-disabled one', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem as='a' disabled>Settings</MenuItem>
          <MenuItem as='a' disabled>Profile</MenuItem>
          <MenuItem as='a'>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible({ disabledItems: [0, 1] })

    await focus(getMenuButton())
    assertMenuButtonIsFocused()

    await press(Keyboard.Space)
    assertMenuIsOpen()
    assertActiveMenuItemIs(2)
  })

  test('`Space` key should open the menu and menu should have no active item when no MenuItem exits', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList/>
      </Menu>
    `)

    await focus(getMenuButton())
    assertMenuButtonIsFocused()

    await press(Keyboard.Space)
    assertMenuIsOpen()
    assertNoActiveMenuItem()
  })

  test('`Space` key should open the menu and menu should have no active item when all MenuItems are disabled', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem as='a' disabled>Settings</MenuItem>
          <MenuItem as='a' disabled>Profile</MenuItem>
          <MenuItem as='a' disabled>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible({ disabledItems: [0, 1, 2] })

    await focus(getMenuButton())
    assertMenuButtonIsFocused()

    await press(Keyboard.Space)
    assertMenuIsOpen()
    assertNoActiveMenuItem()
  })

  test('`Space` key will close the menu when there is no active MenuItem', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem as='a'>Settings</MenuItem>
          <MenuItem as='a'>Profile</MenuItem>
          <MenuItem as='a'>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()
    assertMenuIsClosed()

    await click(getMenuButton())
    assertMenuIsOpen()
    assertNoActiveMenuItem()

    await press(Keyboard.Space)
    assertMenuIsClosed()
  })

  test('`Space` key should invoke the active MenuItem and close the menu', async () => {
    const clickHandler = jest.fn()

    render({
      template: `
        <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem as='a' @click='clickHandler'>Settings</MenuItem>
          <MenuItem as='a'>Profile</MenuItem>
          <MenuItem as='a'>Sign out</MenuItem>
        </MenuList>
        </Menu>
      `,
      setup: () => ({ clickHandler }),
    })

    await nextTick()
    assertMenuIsFullyAccessible()
    assertMenuIsClosed()

    await focus(getMenuButton())
    await press(Keyboard.Space)
    assertMenuIsOpen()
    assertActiveMenuItemIs(0)

    await press(Keyboard.Space)
    assertMenuIsClosed()
    expect(clickHandler).toHaveBeenCalled()
  })
})

describe('`Enter` key', () => {
  test('`Enter` key should open the menu', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem as='a'>Settings</MenuItem>
          <MenuItem as='a'>Profile</MenuItem>
          <MenuItem as='a'>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()
    assertMenuIsClosed()

    await focus(getMenuButton())
    assertMenuButtonIsFocused()

    await press(Keyboard.Enter)
    assertMenuIsOpen()
    assertActiveMenuItemIs(0)
  })

  test('`Enter` key should not open the menu when MenuButton is disabled', async () => {
    render(`
      <Menu>
        <MenuButton disabled>Options</MenuButton>
        <MenuList>
          <MenuItem as='a'>Settings</MenuItem>
          <MenuItem as='a'>Profile</MenuItem>
          <MenuItem as='a'>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()
    assertMenuIsClosed()

    await focus(getMenuButton())
    await press(Keyboard.Enter)
    assertMenuIsClosed()
  })

  test('`Enter` key should open the menu and focus on the first non-disabled MenuItem', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem as='a' disabled>Settings</MenuItem>
          <MenuItem as='a'>Profile</MenuItem>
          <MenuItem as='a'>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible({ disabledItems: [0] })

    await focus(getMenuButton())
    assertMenuButtonIsFocused()

    await press(Keyboard.Enter)
    assertMenuIsOpen()
    assertActiveMenuItemIs(1)
  })

  test('`Enter` key should open the menu, skip all disabled MenuItems and focus on the first non-disabled one', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem as='a' disabled>Settings</MenuItem>
          <MenuItem as='a' disabled>Profile</MenuItem>
          <MenuItem as='a'>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible({ disabledItems: [0, 1] })

    await focus(getMenuButton())
    assertMenuButtonIsFocused()

    await press(Keyboard.Enter)
    assertMenuIsOpen()
    assertActiveMenuItemIs(2)
  })

  test('`Enter` key should open the menu and menu should have no active item when no MenuItem exits', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList/>
      </Menu>
    `)

    await focus(getMenuButton())
    assertMenuButtonIsFocused()

    await press(Keyboard.Enter)
    assertMenuIsOpen()
    assertNoActiveMenuItem()
  })

  test('`Enter` key should open the menu and menu should have no active item when all MenuItems are disabled', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem as='a' disabled>Settings</MenuItem>
          <MenuItem as='a' disabled>Profile</MenuItem>
          <MenuItem as='a' disabled>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible({ disabledItems: [0, 1, 2] })

    await focus(getMenuButton())
    assertMenuButtonIsFocused()

    await press(Keyboard.Enter)
    assertMenuIsOpen()
    assertNoActiveMenuItem()
  })

  test('`Enter` key will close the menu when there is no active MenuItem', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem as='a'>Settings</MenuItem>
          <MenuItem as='a'>Profile</MenuItem>
          <MenuItem as='a'>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()
    assertMenuIsClosed()

    await click(getMenuButton())
    assertMenuIsOpen()
    assertNoActiveMenuItem()

    await press(Keyboard.Enter)
    assertMenuIsClosed()
  })

  test('`Enter` key should invoke the active MenuItem and close the menu', async () => {
    const clickHandler = jest.fn()

    render({
      template: `
        <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem as='a' @click='clickHandler'>Settings</MenuItem>
          <MenuItem as='a'>Profile</MenuItem>
          <MenuItem as='a'>Sign out</MenuItem>
        </MenuList>
        </Menu>
      `,
      setup: () => ({ clickHandler }),
    })

    await nextTick()
    assertMenuIsFullyAccessible()
    assertMenuIsClosed()

    await focus(getMenuButton())
    await press(Keyboard.Enter)
    assertMenuIsOpen()
    assertActiveMenuItemIs(0)

    await press(Keyboard.Enter)
    assertMenuIsClosed()
    expect(clickHandler).toHaveBeenCalled()
  })
})

describe('`ArrowDown` key', () => {
  test('`ArrowDown` key should open the menu', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem as='a'>Settings</MenuItem>
          <MenuItem as='a'>Profile</MenuItem>
          <MenuItem as='a'>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()

    await focus(getMenuButton())
    assertMenuButtonIsFocused()

    await press(Keyboard.ArrowDown)
    assertMenuIsOpen()
    assertActiveMenuItemIs(0)
  })

  test('`ArrowDown` key should not open the menu when MenuButton is disabled', async () => {
    render(`
      <Menu>
        <MenuButton disabled>Options</MenuButton>
        <MenuList>
          <MenuItem as='a'>Settings</MenuItem>
          <MenuItem as='a'>Profile</MenuItem>
          <MenuItem as='a'>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()
    assertMenuIsClosed()

    await focus(getMenuButton())
    await press(Keyboard.ArrowDown)
    assertMenuIsClosed()
  })

  test('`ArrowDown` key should open the menu and menu should have no active item when no MenuItem exits', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList/>
      </Menu>
    `)

    await focus(getMenuButton())
    assertMenuButtonIsFocused()

    await press(Keyboard.ArrowDown)
    assertMenuIsOpen()
    assertNoActiveMenuItem()
  })

  test('`ArrowDown` key should open the menu and focus on the first non-disabled MenuItem', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem as='a' disabled>Settings</MenuItem>
          <MenuItem as='a'>Profile</MenuItem>
          <MenuItem as='a'>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible({ disabledItems: [0] })

    await focus(getMenuButton())
    assertMenuButtonIsFocused()

    await press(Keyboard.ArrowDown)
    assertMenuIsOpen()
    assertActiveMenuItemIs(1)
  })

  test('`ArrowDown` key should open the menu, skip all disabled MenuItems and focus on the first non-disabled one', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem as='a' disabled>Settings</MenuItem>
          <MenuItem as='a' disabled>Profile</MenuItem>
          <MenuItem as='a'>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible({ disabledItems: [0, 1] })

    await focus(getMenuButton())
    assertMenuButtonIsFocused()

    await press(Keyboard.ArrowDown)
    assertMenuIsOpen()
    assertActiveMenuItemIs(2)
  })

  test('`ArrowDown` key should navigate the MenuItems while menu is open', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem as='a'>Settings</MenuItem>
          <MenuItem as='a'>Profile</MenuItem>
          <MenuItem as='a'>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()

    await focus(getMenuButton())
    assertMenuButtonIsFocused()

    await press(Keyboard.ArrowDown)
    assertMenuIsOpen()
    assertActiveMenuItemIs(0)

    await press(Keyboard.ArrowDown)
    assertMenuIsOpen()
    assertActiveMenuItemIs(1)

    await press(Keyboard.ArrowDown)
    assertMenuIsOpen()
    assertActiveMenuItemIs(2)
  })

  test('`ArrowDown` key should navigate the MenuItems and skip the disabled MenuItems while navigating', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem as='a'>Settings</MenuItem>
          <MenuItem as='a' disabled>Profile</MenuItem>
          <MenuItem as='a'>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible({ disabledItems: [1] })

    await focus(getMenuButton())
    assertMenuButtonIsFocused()

    await press(Keyboard.ArrowDown)
    assertMenuIsOpen()
    assertActiveMenuItemIs(0)

    await press(Keyboard.ArrowDown)
    assertMenuIsOpen()
    assertActiveMenuItemIs(2)
  })

  test('`ArrowDown` key should navigate the MenuItems and skip all disabled MenuItems while navigating', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem as='a'>Settings</MenuItem>
          <MenuItem as='a' disabled>Profile</MenuItem>
          <MenuItem as='a' disabled>Help</MenuItem>
          <MenuItem as='a'>Sign out</MenuItem>
        </MenuList>
      </Menu>
      `)

    await nextTick()
    assertMenuIsFullyAccessible({ disabledItems: [1, 2] })

    await focus(getMenuButton())
    assertMenuButtonIsFocused()

    await press(Keyboard.ArrowDown)
    assertMenuIsOpen()
    assertActiveMenuItemIs(0)

    await press(Keyboard.ArrowDown)
    assertMenuIsOpen()
    assertActiveMenuItemIs(3)
  })

  test('`ArrowDown` key should navigate the MenuItems and stop on the last item', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem as='a'>Settings</MenuItem>
          <MenuItem as='a'>Profile</MenuItem>
          <MenuItem as='a'>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()

    await focus(getMenuButton())
    assertMenuButtonIsFocused()

    await press(Keyboard.ArrowDown)
    await press(Keyboard.ArrowDown)
    await press(Keyboard.ArrowDown)
    assertMenuIsOpen()
    assertActiveMenuItemIs(2)

    await press(Keyboard.ArrowDown)
    assertActiveMenuItemIs(2)
  })
})

describe('`ArrowUp` key', () => {
  test('`ArrowUp` key should open the menu', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem as='a'>Settings</MenuItem>
          <MenuItem as='a'>Profile</MenuItem>
          <MenuItem as='a'>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()

    await focus(getMenuButton())
    assertMenuButtonIsFocused()

    await press(Keyboard.ArrowUp)
    assertMenuIsOpen()
    assertActiveMenuItemIs(2)
  })

  test('`ArrowUp` key should not open the menu when MenuButton is disabled', async () => {
    render(`
      <Menu>
        <MenuButton disabled>Options</MenuButton>
        <MenuList>
          <MenuItem as='a'>Settings</MenuItem>
          <MenuItem as='a'>Profile</MenuItem>
          <MenuItem as='a'>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()
    assertMenuIsClosed()

    await focus(getMenuButton())
    await press(Keyboard.ArrowUp)
    assertMenuIsClosed()
  })

  test('`ArrowUp` key should open the menu and menu should have no active item when no MenuItem exits', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList/>
      </Menu>
    `)

    await focus(getMenuButton())
    assertMenuButtonIsFocused()

    await press(Keyboard.ArrowUp)
    assertMenuIsOpen()
    assertNoActiveMenuItem()
  })

  test('`ArrowUp` key should open the menu and focus on the last non-disabled MenuItem', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem as='a'>Settings</MenuItem>
          <MenuItem as='a'>Profile</MenuItem>
          <MenuItem as='a' disabled>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible({ disabledItems: [2] })

    await focus(getMenuButton())
    assertMenuButtonIsFocused()

    await press(Keyboard.ArrowUp)
    assertMenuIsOpen()
    assertActiveMenuItemIs(1)
  })

  test('`ArrowUp` key should open the menu, skip all disabled MenuItems and focus on the first non-disabled one', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem as='a'>Settings</MenuItem>
          <MenuItem as='a' disabled>Profile</MenuItem>
          <MenuItem as='a' disabled>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible({ disabledItems: [1, 2] })

    await focus(getMenuButton())
    assertMenuButtonIsFocused()

    await press(Keyboard.ArrowUp)
    assertMenuIsOpen()
    assertActiveMenuItemIs(0)
  })

  test('`ArrowUp` key should navigate the MenuItems while menu is open', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem as='a'>Settings</MenuItem>
          <MenuItem as='a'>Profile</MenuItem>
          <MenuItem as='a'>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()

    await focus(getMenuButton())
    assertMenuButtonIsFocused()

    await press(Keyboard.ArrowUp)
    assertMenuIsOpen()
    assertActiveMenuItemIs(2)

    await press(Keyboard.ArrowUp)
    assertMenuIsOpen()
    assertActiveMenuItemIs(1)

    await press(Keyboard.ArrowUp)
    assertMenuIsOpen()
    assertActiveMenuItemIs(0)
  })

  test('`ArrowUp` key should navigate the MenuItems and skip the disabled MenuItems while navigating', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem as='a'>Settings</MenuItem>
          <MenuItem as='a' disabled>Profile</MenuItem>
          <MenuItem as='a'>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible({ disabledItems: [1] })

    await focus(getMenuButton())
    assertMenuButtonIsFocused()

    await press(Keyboard.ArrowUp)
    assertMenuIsOpen()
    assertActiveMenuItemIs(2)

    await press(Keyboard.ArrowUp)
    assertMenuIsOpen()
    assertActiveMenuItemIs(0)
  })

  test('`ArrowUp` key should navigate the MenuItems and skip all disabled MenuItems while navigating', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem as='a'>Settings</MenuItem>
          <MenuItem as='a' disabled>Profile</MenuItem>
          <MenuItem as='a' disabled>Help</MenuItem>
          <MenuItem as='a'>Sign out</MenuItem>
        </MenuList>
      </Menu>
      `)

    await nextTick()
    assertMenuIsFullyAccessible({ disabledItems: [1, 2] })

    await focus(getMenuButton())
    assertMenuButtonIsFocused()

    await press(Keyboard.ArrowUp)
    assertMenuIsOpen()
    assertActiveMenuItemIs(3)

    await press(Keyboard.ArrowUp)
    assertMenuIsOpen()
    assertActiveMenuItemIs(0)
  })

  test('`ArrowUp` key should navigate the MenuItems and stop on the last item', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem as='a'>Settings</MenuItem>
          <MenuItem as='a'>Profile</MenuItem>
          <MenuItem as='a'>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()

    await focus(getMenuButton())
    assertMenuButtonIsFocused()

    await press(Keyboard.ArrowUp)
    await press(Keyboard.ArrowUp)
    await press(Keyboard.ArrowUp)
    assertMenuIsOpen()
    assertActiveMenuItemIs(0)

    await press(Keyboard.ArrowUp)
    assertActiveMenuItemIs(0)
  })
})

describe('`Escape` key', () => {
  test('`Escape` Key should close the menu', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem as='a'>Settings</MenuItem>
          <MenuItem as='a'>Profile</MenuItem>
          <MenuItem as='a'>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()

    await focus(getMenuButton())
    assertMenuButtonIsFocused()

    await press(Keyboard.Enter)
    assertMenuIsOpen()
    assertActiveMenuItemIs(0)

    await press(Keyboard.Escape)
    assertMenuIsClosed()
    assertMenuButtonIsFocused()
  })
})

describe('`End` key', () => {
  test('`End` key should jump to last MenuItem', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem as='a'>Settings</MenuItem>
          <MenuItem as='a'>Profile</MenuItem>
          <MenuItem as='a'>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()

    await focus(getMenuButton())
    assertMenuButtonIsFocused()

    await press(Keyboard.Enter)
    assertMenuIsOpen()
    assertActiveMenuItemIs(0)

    await press(Keyboard.End)
    assertActiveMenuItemIs(2)
  })

  test('`End` key should jump to last non-disabled MenuItem', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem as='a'>Settings</MenuItem>
          <MenuItem as='a'>Profile</MenuItem>
          <MenuItem as='a' disabled>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible({ disabledItems: [2] })

    await focus(getMenuButton())
    assertMenuButtonIsFocused()

    await press(Keyboard.Enter)
    assertMenuIsOpen()
    assertActiveMenuItemIs(0)

    await press(Keyboard.End)
    assertActiveMenuItemIs(1)
  })

  test('`End` key should jump to last non-disabled MenuItem (skips multiple disabled MenuItems)', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem as='a'>Settings</MenuItem>
          <MenuItem as='a' disabled>Profile</MenuItem>
          <MenuItem as='a' disabled>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible({ disabledItems: [1, 2] })

    await focus(getMenuButton())
    assertMenuButtonIsFocused()

    await press(Keyboard.Enter)
    assertMenuIsOpen()
    assertActiveMenuItemIs(0)

    await press(Keyboard.End)
    assertActiveMenuItemIs(0)
  })

  test('`End` key should be ignored when no non-disabled MenuItems exists', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem as='a' disabled>Settings</MenuItem>
          <MenuItem as='a' disabled>Profile</MenuItem>
          <MenuItem as='a' disabled>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible({ disabledItems: [0, 1, 2] })

    await focus(getMenuButton())
    assertMenuButtonIsFocused()

    await press(Keyboard.Enter)
    assertMenuIsOpen()
    assertNoActiveMenuItem()

    await press(Keyboard.End)
    assertNoActiveMenuItem()
  })
})

describe('`PageDown` key', () => {
  test('`PageDown` key should jump to last MenuItem', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem as='a'>Settings</MenuItem>
          <MenuItem as='a'>Profile</MenuItem>
          <MenuItem as='a'>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()

    await focus(getMenuButton())
    assertMenuButtonIsFocused()

    await press(Keyboard.Enter)
    assertMenuIsOpen()
    assertActiveMenuItemIs(0)

    await press(Keyboard.PageDown)
    assertActiveMenuItemIs(2)
  })

  test('`PageDown` key should jump to last non-disabled MenuItem', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem as='a'>Settings</MenuItem>
          <MenuItem as='a'>Profile</MenuItem>
          <MenuItem as='a' disabled>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible({ disabledItems: [2] })

    await focus(getMenuButton())
    assertMenuButtonIsFocused()

    await press(Keyboard.Enter)
    assertMenuIsOpen()
    assertActiveMenuItemIs(0)

    await press(Keyboard.PageDown)
    assertActiveMenuItemIs(1)
  })

  test('`PageDown` key should jump to last non-disabled MenuItem (skips multiple disabled MenuItems)', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem as='a'>Settings</MenuItem>
          <MenuItem as='a' disabled>Profile</MenuItem>
          <MenuItem as='a' disabled>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible({ disabledItems: [1, 2] })

    await focus(getMenuButton())
    assertMenuButtonIsFocused()

    await press(Keyboard.Enter)
    assertMenuIsOpen()
    assertActiveMenuItemIs(0)

    await press(Keyboard.PageDown)
    assertActiveMenuItemIs(0)
  })

  test('`PageDown` key should be ignored when no non-disabled MenuItems exists', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem as='a' disabled>Settings</MenuItem>
          <MenuItem as='a' disabled>Profile</MenuItem>
          <MenuItem as='a' disabled>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible({ disabledItems: [0, 1, 2] })

    await focus(getMenuButton())
    assertMenuButtonIsFocused()

    await press(Keyboard.Enter)
    assertMenuIsOpen()
    assertNoActiveMenuItem()

    await press(Keyboard.PageDown)
    assertNoActiveMenuItem()
  })
})

describe('`Home` key', () => {
  test('`Home` key should jump to first MenuItem', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem as='a'>Settings</MenuItem>
          <MenuItem as='a'>Profile</MenuItem>
          <MenuItem as='a'>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()

    await focus(getMenuButton())
    assertMenuButtonIsFocused()

    await press(Keyboard.ArrowUp)
    assertMenuIsOpen()
    assertActiveMenuItemIs(2)

    await press(Keyboard.Home)
    assertActiveMenuItemIs(0)
  })

  test('`Home` key should jump to first non-disabled MenuItem', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem as='a' disabled>Settings</MenuItem>
          <MenuItem as='a'>Profile</MenuItem>
          <MenuItem as='a'>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible({ disabledItems: [0] })

    await focus(getMenuButton())
    assertMenuButtonIsFocused()

    await press(Keyboard.ArrowUp)
    assertMenuIsOpen()
    assertActiveMenuItemIs(2)

    await press(Keyboard.Home)
    assertActiveMenuItemIs(1)
  })

  test('`Home` key should jump to first non-disabled MenuItem (skips multiple disabled MenuItems)', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem as='a' disabled>Settings</MenuItem>
          <MenuItem as='a' disabled>Profile</MenuItem>
          <MenuItem as='a'>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible({ disabledItems: [0, 1] })

    await focus(getMenuButton())
    assertMenuButtonIsFocused()

    await press(Keyboard.ArrowUp)
    assertMenuIsOpen()
    assertActiveMenuItemIs(2)

    await press(Keyboard.Home)
    assertActiveMenuItemIs(2)
  })

  test('`Home` key should be ignored when no non-disabled MenuItems exists', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem as='a' disabled>Settings</MenuItem>
          <MenuItem as='a' disabled>Profile</MenuItem>
          <MenuItem as='a' disabled>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible({ disabledItems: [0, 1, 2] })

    await focus(getMenuButton())
    assertMenuButtonIsFocused()

    await press(Keyboard.ArrowUp)
    assertMenuIsOpen()
    assertNoActiveMenuItem()

    await press(Keyboard.Home)
    assertNoActiveMenuItem()
  })
})

describe('`PageUp` key', () => {
  test('`PageUp` key should jump to first MenuItem', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem as='a'>Settings</MenuItem>
          <MenuItem as='a'>Profile</MenuItem>
          <MenuItem as='a'>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()

    await focus(getMenuButton())
    assertMenuButtonIsFocused()

    await press(Keyboard.ArrowUp)
    assertMenuIsOpen()
    assertActiveMenuItemIs(2)

    await press(Keyboard.PageUp)
    assertActiveMenuItemIs(0)
  })

  test('`PageUp` key should jump to first non-disabled MenuItem', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem as='a' disabled>Settings</MenuItem>
          <MenuItem as='a'>Profile</MenuItem>
          <MenuItem as='a'>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible({ disabledItems: [0] })

    await focus(getMenuButton())
    assertMenuButtonIsFocused()

    await press(Keyboard.ArrowUp)
    assertMenuIsOpen()
    assertActiveMenuItemIs(2)

    await press(Keyboard.PageUp)
    assertActiveMenuItemIs(1)
  })

  test('`PageUp` key should jump to first non-disabled MenuItem (skips multiple disabled MenuItems)', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem as='a' disabled>Settings</MenuItem>
          <MenuItem as='a' disabled>Profile</MenuItem>
          <MenuItem as='a'>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible({ disabledItems: [0, 1] })

    await focus(getMenuButton())
    assertMenuButtonIsFocused()

    await press(Keyboard.ArrowUp)
    assertMenuIsOpen()
    assertActiveMenuItemIs(2)

    await press(Keyboard.PageUp)
    assertActiveMenuItemIs(2)
  })

  test('`PageUp` key should be ignored when no non-disabled MenuItems exists', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem as='a' disabled>Settings</MenuItem>
          <MenuItem as='a' disabled>Profile</MenuItem>
          <MenuItem as='a' disabled>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible({ disabledItems: [0, 1, 2] })

    await focus(getMenuButton())
    assertMenuButtonIsFocused()

    await press(Keyboard.ArrowUp)
    assertMenuIsOpen()
    assertNoActiveMenuItem()

    await press(Keyboard.PageUp)
    assertNoActiveMenuItem()
  })
})

describe('`Any` key / searching', () => {
  test('typing a single character should jump to the first matching MenuItem', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem as='a'>Settings</MenuItem>
          <MenuItem as='a'>Profile</MenuItem>
          <MenuItem as='a'>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()

    await click(getMenuButton())
    assertMenuIsOpen()
    assertNoActiveMenuItem()

    await type('P')
    assertActiveMenuItemIs(1)

    await type('S')
    assertActiveMenuItemIs(0)
  })

  test('typing a single character (case-insensitive) should jump to the first matching MenuItem', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem as='a'>Settings</MenuItem>
          <MenuItem as='a'>Profile</MenuItem>
          <MenuItem as='a'>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()

    await click(getMenuButton())
    assertMenuIsOpen()
    assertNoActiveMenuItem()

    await type('p')
    assertActiveMenuItemIs(1)

    await type('s')
    assertActiveMenuItemIs(0)
  })

  test('typing a full world should jump to the first matching MenuItem', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem as='a'>Settings</MenuItem>
          <MenuItem as='a'>Profile</MenuItem>
          <MenuItem as='a'>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()

    await click(getMenuButton())
    assertMenuIsOpen()
    assertNoActiveMenuItem()

    await type('Profile')
    assertActiveMenuItemIs(1)

    await type('Settings')
    assertActiveMenuItemIs(0)
  })

  test('typing a full world (case-insensitive) should jump to the first matching MenuItem', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem as='a'>Settings</MenuItem>
          <MenuItem as='a'>Profile</MenuItem>
          <MenuItem as='a'>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()

    await click(getMenuButton())
    assertMenuIsOpen()
    assertNoActiveMenuItem()

    await type('profile')
    assertActiveMenuItemIs(1)

    await type('settings')
    assertActiveMenuItemIs(0)
  })

  test('typing a world partially should jump to the first matching MenuItem', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem as='a'>Settings</MenuItem>
          <MenuItem as='a'>Profile</MenuItem>
          <MenuItem as='a'>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()

    await click(getMenuButton())
    assertMenuIsOpen()
    assertNoActiveMenuItem()

    await type('prof')
    assertActiveMenuItemIs(1)

    await type('sig')
    assertActiveMenuItemIs(2)

    await type('se')
    assertActiveMenuItemIs(0)
  })

  test('typing a world which contains whitespaces should jump to the first matching MenuItem', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem as='a'>Settings</MenuItem>
          <MenuItem as='a'>Profile</MenuItem>
          <MenuItem as='a'>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()

    await click(getMenuButton())
    assertMenuIsOpen()
    assertNoActiveMenuItem()

    await type('sign out')
    assertActiveMenuItemIs(2)
  })

  test('should not activate a disabled matching MenuItem while searching', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem as='a'>Settings</MenuItem>
          <MenuItem as='a' disabled>Profile</MenuItem>
          <MenuItem as='a'>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible({ disabledItems: [1] })

    await click(getMenuButton())
    assertMenuIsOpen()
    assertNoActiveMenuItem()

    await type('profile')
    assertNoActiveMenuItem()
  })
})
