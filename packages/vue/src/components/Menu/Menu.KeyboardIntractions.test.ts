import { nextTick } from 'vue'
import userEvent from '@testing-library/user-event'
import {
  assertActiveMenuItemIs,
  assertMenuButtonIsFocused,
  assertMenuIsClosed,
  assertMenuIsFullyAccessible,
  assertMenuIsOpen,
  assertNoActiveMenuItem,
  getMenuButton,
  press,
  render,
} from './test-utils'
import { Keys } from './Menu'

jest.useFakeTimers()

describe('`Space` key', () => {
  test('`Space` key should open the menu', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Profile</MenuItem>
          <MenuItem>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()
    assertMenuIsClosed()

    getMenuButton().focus()
    assertMenuButtonIsFocused()

    await press(Keys.Space)
    assertMenuIsOpen()
    assertActiveMenuItemIs(0)
  })

  test('`Space` key should not open the menu when MenuButton is disabled', async () => {
    render(`
      <Menu>
        <MenuButton disabled>Options</MenuButton>
        <MenuList>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Profile</MenuItem>
          <MenuItem>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()
    assertMenuIsClosed()

    getMenuButton().focus()
    await press(Keys.Space)
    assertMenuIsClosed()
  })

  test('`Space` key should open the menu and focus on the first non-disabled MenuItem', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem disabled>Settings</MenuItem>
          <MenuItem>Profile</MenuItem>
          <MenuItem>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible({ disabledItems: [0] })

    getMenuButton().focus()
    assertMenuButtonIsFocused()

    await press(Keys.Space)
    assertMenuIsOpen()
    assertActiveMenuItemIs(1)
  })

  test('`Space` key should open the menu, skip all disabled MenuItems and focus on the first non-disabled one', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem disabled>Settings</MenuItem>
          <MenuItem disabled>Profile</MenuItem>
          <MenuItem>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible({ disabledItems: [0, 1] })

    getMenuButton().focus()
    assertMenuButtonIsFocused()

    await press(Keys.Space)
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

    getMenuButton().focus()
    assertMenuButtonIsFocused()

    await press(Keys.Space)
    assertMenuIsOpen()
    assertNoActiveMenuItem()
  })

  test('`Space` key should open the menu and menu should have no active item when all MenuItems are disabled', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem disabled>Settings</MenuItem>
          <MenuItem disabled>Profile</MenuItem>
          <MenuItem disabled>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible({ disabledItems: [0, 1, 2] })

    getMenuButton().focus()
    assertMenuButtonIsFocused()

    await press(Keys.Space)
    assertMenuIsOpen()
    assertNoActiveMenuItem()
  })

  test('`Space` key will close the menu when there is no active MenuItem', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Profile</MenuItem>
          <MenuItem>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()
    assertMenuIsClosed()

    userEvent.click(getMenuButton())
    await nextTick()
    assertMenuIsOpen()
    assertNoActiveMenuItem()

    await press(Keys.Space)
    assertMenuIsClosed()
  })

  test('`Space` key should invoke the active MenuItem and close the menu', async () => {
    const clickHandler = jest.fn()

    render({
      template: `
        <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem @click='clickHandler'>Settings</MenuItem>
          <MenuItem>Profile</MenuItem>
          <MenuItem>Sign out</MenuItem>
        </MenuList>
        </Menu>
      `,
      setup: () => ({ clickHandler }),
    })

    await nextTick()
    assertMenuIsFullyAccessible()
    assertMenuIsClosed()

    getMenuButton().focus()
    await press(Keys.Space)
    assertMenuIsOpen()
    assertActiveMenuItemIs(0)

    await press(Keys.Space)
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
          <MenuItem>Settings</MenuItem>
          <MenuItem>Profile</MenuItem>
          <MenuItem>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()
    assertMenuIsClosed()

    getMenuButton().focus()
    assertMenuButtonIsFocused()

    await press(Keys.Enter)
    assertMenuIsOpen()
    assertActiveMenuItemIs(0)
  })

  test('`Enter` key should not open the menu when MenuButton is disabled', async () => {
    render(`
      <Menu>
        <MenuButton disabled>Options</MenuButton>
        <MenuList>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Profile</MenuItem>
          <MenuItem>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()
    assertMenuIsClosed()

    getMenuButton().focus()
    await press(Keys.Enter)
    assertMenuIsClosed()
  })

  test('`Enter` key should open the menu and focus on the first non-disabled MenuItem', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem disabled>Settings</MenuItem>
          <MenuItem>Profile</MenuItem>
          <MenuItem>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible({ disabledItems: [0] })

    getMenuButton().focus()
    assertMenuButtonIsFocused()

    await press(Keys.Enter)
    assertMenuIsOpen()
    assertActiveMenuItemIs(1)
  })

  test('`Enter` key should open the menu, skip all disabled MenuItems and focus on the first non-disabled one', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem disabled>Settings</MenuItem>
          <MenuItem disabled>Profile</MenuItem>
          <MenuItem>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible({ disabledItems: [0, 1] })

    getMenuButton().focus()
    assertMenuButtonIsFocused()

    await press(Keys.Enter)
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

    getMenuButton().focus()
    assertMenuButtonIsFocused()

    await press(Keys.Enter)
    assertMenuIsOpen()
    assertNoActiveMenuItem()
  })

  test('`Enter` key should open the menu and menu should have no active item when all MenuItems are disabled', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem disabled>Settings</MenuItem>
          <MenuItem disabled>Profile</MenuItem>
          <MenuItem disabled>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible({ disabledItems: [0, 1, 2] })

    getMenuButton().focus()
    assertMenuButtonIsFocused()

    await press(Keys.Enter)
    assertMenuIsOpen()
    assertNoActiveMenuItem()
  })

  test('`Enter` key will close the menu when there is no active MenuItem', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Profile</MenuItem>
          <MenuItem>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()
    assertMenuIsClosed()

    userEvent.click(getMenuButton())
    await nextTick()
    assertMenuIsOpen()
    assertNoActiveMenuItem()

    await press(Keys.Enter)
    assertMenuIsClosed()
  })

  test('`Enter` key should invoke the active MenuItem and close the menu', async () => {
    const clickHandler = jest.fn()

    render({
      template: `
        <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem @click='clickHandler'>Settings</MenuItem>
          <MenuItem>Profile</MenuItem>
          <MenuItem>Sign out</MenuItem>
        </MenuList>
        </Menu>
      `,
      setup: () => ({ clickHandler }),
    })

    await nextTick()
    assertMenuIsFullyAccessible()
    assertMenuIsClosed()

    getMenuButton().focus()
    await press(Keys.Enter)
    assertMenuIsOpen()
    assertActiveMenuItemIs(0)

    await press(Keys.Enter)
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
          <MenuItem>Settings</MenuItem>
          <MenuItem>Profile</MenuItem>
          <MenuItem>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()

    getMenuButton().focus()
    assertMenuButtonIsFocused()

    await press(Keys.ArrowDown)
    assertMenuIsOpen()
    assertActiveMenuItemIs(0)
  })

  test('`ArrowDown` key should not open the menu when MenuButton is disabled', async () => {
    render(`
      <Menu>
        <MenuButton disabled>Options</MenuButton>
        <MenuList>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Profile</MenuItem>
          <MenuItem>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()
    assertMenuIsClosed()

    getMenuButton().focus()
    await press(Keys.ArrowDown)
    assertMenuIsClosed()
  })

  test('`ArrowDown` key should open the menu and menu should have no active item when no MenuItem exits', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList/>
      </Menu>
    `)

    getMenuButton().focus()
    assertMenuButtonIsFocused()

    await press(Keys.ArrowDown)
    assertMenuIsOpen()
    assertNoActiveMenuItem()
  })

  test('`ArrowDown` key should open the menu and focus on the first non-disabled MenuItem', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem disabled>Settings</MenuItem>
          <MenuItem>Profile</MenuItem>
          <MenuItem>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible({ disabledItems: [0] })

    getMenuButton().focus()
    assertMenuButtonIsFocused()

    await press(Keys.ArrowDown)
    assertMenuIsOpen()
    assertActiveMenuItemIs(1)
  })

  test('`ArrowDown` key should open the menu, skip all disabled MenuItems and focus on the first non-disabled one', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem disabled>Settings</MenuItem>
          <MenuItem disabled>Profile</MenuItem>
          <MenuItem>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible({ disabledItems: [0, 1] })

    getMenuButton().focus()
    assertMenuButtonIsFocused()

    await press(Keys.ArrowDown)
    assertMenuIsOpen()
    assertActiveMenuItemIs(2)
  })

  test('`ArrowDown` key should navigate the MenuItems while menu is open', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Profile</MenuItem>
          <MenuItem>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()

    getMenuButton().focus()
    assertMenuButtonIsFocused()

    await press(Keys.ArrowDown)
    assertMenuIsOpen()
    assertActiveMenuItemIs(0)

    await press(Keys.ArrowDown)
    assertMenuIsOpen()
    assertActiveMenuItemIs(1)

    await press(Keys.ArrowDown)
    assertMenuIsOpen()
    assertActiveMenuItemIs(2)
  })

  test('`ArrowDown` key should navigate the MenuItems and skip the disabled MenuItems while navigating', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem>Settings</MenuItem>
          <MenuItem disabled>Profile</MenuItem>
          <MenuItem>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible({ disabledItems: [1] })

    getMenuButton().focus()
    assertMenuButtonIsFocused()

    await press(Keys.ArrowDown)
    assertMenuIsOpen()
    assertActiveMenuItemIs(0)

    await press(Keys.ArrowDown)
    assertMenuIsOpen()
    assertActiveMenuItemIs(2)
  })

  test('`ArrowDown` key should navigate the MenuItems and skip all disabled MenuItems while navigating', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem>Settings</MenuItem>
          <MenuItem disabled>Profile</MenuItem>
          <MenuItem disabled>Help</MenuItem>
          <MenuItem>Sign out</MenuItem>
        </MenuList>
      </Menu>
      `)

    await nextTick()
    assertMenuIsFullyAccessible({ disabledItems: [1, 2] })

    getMenuButton().focus()
    assertMenuButtonIsFocused()

    await press(Keys.ArrowDown)
    assertMenuIsOpen()
    assertActiveMenuItemIs(0)

    await press(Keys.ArrowDown)
    assertMenuIsOpen()
    assertActiveMenuItemIs(3)
  })

  test('`ArrowDown` key should navigate the MenuItems and stop on the last item', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Profile</MenuItem>
          <MenuItem>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()

    getMenuButton().focus()
    assertMenuButtonIsFocused()

    await press(Keys.ArrowDown)
    await press(Keys.ArrowDown)
    await press(Keys.ArrowDown)
    assertMenuIsOpen()
    assertActiveMenuItemIs(2)

    await press(Keys.ArrowDown)
    assertActiveMenuItemIs(2)
  })
})

describe('`ArrowUp` key', () => {
  test('`ArrowUp` key should open the menu', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Profile</MenuItem>
          <MenuItem>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()

    getMenuButton().focus()
    assertMenuButtonIsFocused()

    await press(Keys.ArrowUp)
    assertMenuIsOpen()
    assertActiveMenuItemIs(2)
  })

  test('`ArrowUp` key should not open the menu when MenuButton is disabled', async () => {
    render(`
      <Menu>
        <MenuButton disabled>Options</MenuButton>
        <MenuList>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Profile</MenuItem>
          <MenuItem>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()
    assertMenuIsClosed()

    getMenuButton().focus()
    await press(Keys.ArrowUp)
    assertMenuIsClosed()
  })

  test('`ArrowUp` key should open the menu and menu should have no active item when no MenuItem exits', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList/>
      </Menu>
    `)

    getMenuButton().focus()
    assertMenuButtonIsFocused()

    await press(Keys.ArrowUp)
    assertMenuIsOpen()
    assertNoActiveMenuItem()
  })

  test('`ArrowUp` key should open the menu and focus on the last non-disabled MenuItem', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Profile</MenuItem>
          <MenuItem disabled>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible({ disabledItems: [2] })

    getMenuButton().focus()
    assertMenuButtonIsFocused()

    await press(Keys.ArrowUp)
    assertMenuIsOpen()
    assertActiveMenuItemIs(1)
  })

  test('`ArrowUp` key should open the menu, skip all disabled MenuItems and focus on the first non-disabled one', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem>Settings</MenuItem>
          <MenuItem disabled>Profile</MenuItem>
          <MenuItem disabled>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible({ disabledItems: [1, 2] })

    getMenuButton().focus()
    assertMenuButtonIsFocused()

    await press(Keys.ArrowUp)
    assertMenuIsOpen()
    assertActiveMenuItemIs(0)
  })

  test('`ArrowUp` key should navigate the MenuItems while menu is open', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Profile</MenuItem>
          <MenuItem>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()

    getMenuButton().focus()
    assertMenuButtonIsFocused()

    await press(Keys.ArrowUp)
    assertMenuIsOpen()
    assertActiveMenuItemIs(2)

    await press(Keys.ArrowUp)
    assertMenuIsOpen()
    assertActiveMenuItemIs(1)

    await press(Keys.ArrowUp)
    assertMenuIsOpen()
    assertActiveMenuItemIs(0)
  })

  test('`ArrowUp` key should navigate the MenuItems and skip the disabled MenuItems while navigating', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem>Settings</MenuItem>
          <MenuItem disabled>Profile</MenuItem>
          <MenuItem>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible({ disabledItems: [1] })

    getMenuButton().focus()
    assertMenuButtonIsFocused()

    await press(Keys.ArrowUp)
    assertMenuIsOpen()
    assertActiveMenuItemIs(2)

    await press(Keys.ArrowUp)
    assertMenuIsOpen()
    assertActiveMenuItemIs(0)
  })

  test('`ArrowUp` key should navigate the MenuItems and skip all disabled MenuItems while navigating', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem>Settings</MenuItem>
          <MenuItem disabled>Profile</MenuItem>
          <MenuItem disabled>Help</MenuItem>
          <MenuItem>Sign out</MenuItem>
        </MenuList>
      </Menu>
      `)

    await nextTick()
    assertMenuIsFullyAccessible({ disabledItems: [1, 2] })

    getMenuButton().focus()
    assertMenuButtonIsFocused()

    await press(Keys.ArrowUp)
    assertMenuIsOpen()
    assertActiveMenuItemIs(3)

    await press(Keys.ArrowUp)
    assertMenuIsOpen()
    assertActiveMenuItemIs(0)
  })

  test('`ArrowUp` key should navigate the MenuItems and stop on the last item', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Profile</MenuItem>
          <MenuItem>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()

    getMenuButton().focus()
    assertMenuButtonIsFocused()

    await press(Keys.ArrowUp)
    await press(Keys.ArrowUp)
    await press(Keys.ArrowUp)
    assertMenuIsOpen()
    assertActiveMenuItemIs(0)

    await press(Keys.ArrowUp)
    assertActiveMenuItemIs(0)
  })
})

describe('`Escape` key', () => {
  test('`Escape` Key should close the menu', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Profile</MenuItem>
          <MenuItem>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()

    getMenuButton().focus()
    assertMenuButtonIsFocused()

    await press(Keys.Enter)
    assertMenuIsOpen()
    assertActiveMenuItemIs(0)

    await press(Keys.Escape)
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
          <MenuItem>Settings</MenuItem>
          <MenuItem>Profile</MenuItem>
          <MenuItem>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()

    getMenuButton().focus()
    assertMenuButtonIsFocused()

    await press(Keys.Enter)
    assertMenuIsOpen()
    assertActiveMenuItemIs(0)

    await press(Keys.End)
    assertActiveMenuItemIs(2)
  })

  test('`End` key should jump to last non-disabled MenuItem', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Profile</MenuItem>
          <MenuItem disabled>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible({ disabledItems: [2] })

    getMenuButton().focus()
    assertMenuButtonIsFocused()

    await press(Keys.Enter)
    assertMenuIsOpen()
    assertActiveMenuItemIs(0)

    await press(Keys.End)
    assertActiveMenuItemIs(1)
  })

  test('`End` key should jump to last non-disabled MenuItem (skips multiple disabled MenuItems)', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem>Settings</MenuItem>
          <MenuItem disabled>Profile</MenuItem>
          <MenuItem disabled>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible({ disabledItems: [1, 2] })

    getMenuButton().focus()
    assertMenuButtonIsFocused()

    await press(Keys.Enter)
    assertMenuIsOpen()
    assertActiveMenuItemIs(0)

    await press(Keys.End)
    assertActiveMenuItemIs(0)
  })

  test('`End` key should be ignored when no non-disabled MenuItems exists', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem disabled>Settings</MenuItem>
          <MenuItem disabled>Profile</MenuItem>
          <MenuItem disabled>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible({ disabledItems: [0, 1, 2] })

    getMenuButton().focus()
    assertMenuButtonIsFocused()

    await press(Keys.Enter)
    assertMenuIsOpen()
    assertNoActiveMenuItem()

    await press(Keys.End)
    assertNoActiveMenuItem()
  })
})

describe('`PageDown` key', () => {
  test('`PageDown` key should jump to last MenuItem', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Profile</MenuItem>
          <MenuItem>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()

    getMenuButton().focus()
    assertMenuButtonIsFocused()

    await press(Keys.Enter)
    assertMenuIsOpen()
    assertActiveMenuItemIs(0)

    await press(Keys.PageDown)
    assertActiveMenuItemIs(2)
  })

  test('`PageDown` key should jump to last non-disabled MenuItem', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Profile</MenuItem>
          <MenuItem disabled>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible({ disabledItems: [2] })

    getMenuButton().focus()
    assertMenuButtonIsFocused()

    await press(Keys.Enter)
    assertMenuIsOpen()
    assertActiveMenuItemIs(0)

    await press(Keys.PageDown)
    assertActiveMenuItemIs(1)
  })

  test('`PageDown` key should jump to last non-disabled MenuItem (skips multiple disabled MenuItems)', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem>Settings</MenuItem>
          <MenuItem disabled>Profile</MenuItem>
          <MenuItem disabled>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible({ disabledItems: [1, 2] })

    getMenuButton().focus()
    assertMenuButtonIsFocused()

    await press(Keys.Enter)
    assertMenuIsOpen()
    assertActiveMenuItemIs(0)

    await press(Keys.PageDown)
    assertActiveMenuItemIs(0)
  })

  test('`PageDown` key should be ignored when no non-disabled MenuItems exists', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem disabled>Settings</MenuItem>
          <MenuItem disabled>Profile</MenuItem>
          <MenuItem disabled>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible({ disabledItems: [0, 1, 2] })

    getMenuButton().focus()
    assertMenuButtonIsFocused()

    await press(Keys.Enter)
    assertMenuIsOpen()
    assertNoActiveMenuItem()

    await press(Keys.PageDown)
    assertNoActiveMenuItem()
  })
})

describe('`Home` key', () => {
  test('`Home` key should jump to first MenuItem', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Profile</MenuItem>
          <MenuItem>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()

    getMenuButton().focus()
    assertMenuButtonIsFocused()

    await press(Keys.ArrowUp)
    assertMenuIsOpen()
    assertActiveMenuItemIs(2)

    await press(Keys.Home)
    assertActiveMenuItemIs(0)
  })

  test('`Home` key should jump to first non-disabled MenuItem', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem disabled>Settings</MenuItem>
          <MenuItem>Profile</MenuItem>
          <MenuItem>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible({ disabledItems: [0] })

    getMenuButton().focus()
    assertMenuButtonIsFocused()

    await press(Keys.ArrowUp)
    assertMenuIsOpen()
    assertActiveMenuItemIs(2)

    await press(Keys.Home)
    assertActiveMenuItemIs(1)
  })

  test('`Home` key should jump to first non-disabled MenuItem (skips multiple disabled MenuItems)', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem disabled>Settings</MenuItem>
          <MenuItem disabled>Profile</MenuItem>
          <MenuItem>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible({ disabledItems: [0, 1] })

    getMenuButton().focus()
    assertMenuButtonIsFocused()

    await press(Keys.ArrowUp)
    assertMenuIsOpen()
    assertActiveMenuItemIs(2)

    await press(Keys.Home)
    assertActiveMenuItemIs(2)
  })

  test('`Home` key should be ignored when no non-disabled MenuItems exists', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem disabled>Settings</MenuItem>
          <MenuItem disabled>Profile</MenuItem>
          <MenuItem disabled>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible({ disabledItems: [0, 1, 2] })

    getMenuButton().focus()
    assertMenuButtonIsFocused()

    await press(Keys.ArrowUp)
    assertMenuIsOpen()
    assertNoActiveMenuItem()

    await press(Keys.Home)
    assertNoActiveMenuItem()
  })
})

describe('`PageUp` key', () => {
  test('`PageUp` key should jump to first MenuItem', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Profile</MenuItem>
          <MenuItem>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()

    getMenuButton().focus()
    assertMenuButtonIsFocused()

    await press(Keys.ArrowUp)
    assertMenuIsOpen()
    assertActiveMenuItemIs(2)

    await press(Keys.PageUp)
    assertActiveMenuItemIs(0)
  })

  test('`PageUp` key should jump to first non-disabled MenuItem', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem disabled>Settings</MenuItem>
          <MenuItem>Profile</MenuItem>
          <MenuItem>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible({ disabledItems: [0] })

    getMenuButton().focus()
    assertMenuButtonIsFocused()

    await press(Keys.ArrowUp)
    assertMenuIsOpen()
    assertActiveMenuItemIs(2)

    await press(Keys.PageUp)
    assertActiveMenuItemIs(1)
  })

  test('`PageUp` key should jump to first non-disabled MenuItem (skips multiple disabled MenuItems)', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem disabled>Settings</MenuItem>
          <MenuItem disabled>Profile</MenuItem>
          <MenuItem>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible({ disabledItems: [0, 1] })

    getMenuButton().focus()
    assertMenuButtonIsFocused()

    await press(Keys.ArrowUp)
    assertMenuIsOpen()
    assertActiveMenuItemIs(2)

    await press(Keys.PageUp)
    assertActiveMenuItemIs(2)
  })

  test('`PageUp` key should be ignored when no non-disabled MenuItems exists', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem disabled>Settings</MenuItem>
          <MenuItem disabled>Profile</MenuItem>
          <MenuItem disabled>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible({ disabledItems: [0, 1, 2] })

    getMenuButton().focus()
    assertMenuButtonIsFocused()

    await press(Keys.ArrowUp)
    assertMenuIsOpen()
    assertNoActiveMenuItem()

    await press(Keys.PageUp)
    assertNoActiveMenuItem()
  })
})

describe('`Any` key / searching', () => {
  test('typing a single character should jump to the first matching MenuItem', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Profile</MenuItem>
          <MenuItem>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()

    userEvent.click(getMenuButton())
    await nextTick()
    assertMenuIsOpen()
    assertNoActiveMenuItem()

    userEvent.keyboard('P')
    await nextTick()
    assertActiveMenuItemIs(1)

    jest.runOnlyPendingTimers()

    userEvent.keyboard('S')
    await nextTick()
    assertActiveMenuItemIs(0)
  })

  test('typing a single character (case-insensitive) should jump to the first matching MenuItem', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Profile</MenuItem>
          <MenuItem>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()

    userEvent.click(getMenuButton())
    await nextTick()
    assertMenuIsOpen()
    assertNoActiveMenuItem()

    userEvent.keyboard('p')
    await nextTick()
    assertActiveMenuItemIs(1)

    jest.runOnlyPendingTimers()

    userEvent.keyboard('s')
    await nextTick()
    assertActiveMenuItemIs(0)
  })

  test('typing a full world should jump to the first matching MenuItem', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Profile</MenuItem>
          <MenuItem>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()

    userEvent.click(getMenuButton())
    await nextTick()
    assertMenuIsOpen()
    assertNoActiveMenuItem()

    userEvent.keyboard('Profile')
    await nextTick()
    assertActiveMenuItemIs(1)

    jest.runOnlyPendingTimers()

    userEvent.keyboard('Settings')
    await nextTick()
    assertActiveMenuItemIs(0)
  })

  test('typing a full world (case-insensitive) should jump to the first matching MenuItem', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Profile</MenuItem>
          <MenuItem>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()

    userEvent.click(getMenuButton())
    await nextTick()
    assertMenuIsOpen()
    assertNoActiveMenuItem()

    userEvent.keyboard('profile')
    await nextTick()
    assertActiveMenuItemIs(1)

    jest.runOnlyPendingTimers()

    userEvent.keyboard('settings')
    await nextTick()
    assertActiveMenuItemIs(0)
  })

  test('typing a world partially should jump to the first matching MenuItem', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Profile</MenuItem>
          <MenuItem>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()

    userEvent.click(getMenuButton())
    await nextTick()
    assertMenuIsOpen()
    assertNoActiveMenuItem()

    userEvent.keyboard('prof')
    await nextTick()
    assertActiveMenuItemIs(1)

    jest.runOnlyPendingTimers()

    userEvent.keyboard('sig')
    await nextTick()
    assertActiveMenuItemIs(2)

    jest.runOnlyPendingTimers()

    userEvent.keyboard('se')
    await nextTick()
    assertActiveMenuItemIs(0)
  })

  test('typing a world which contains whitespaces should jump to the first matching MenuItem', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Profile</MenuItem>
          <MenuItem>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()

    userEvent.click(getMenuButton())
    await nextTick()
    assertMenuIsOpen()
    assertNoActiveMenuItem()

    userEvent.keyboard('sign out')
    await nextTick()
    assertActiveMenuItemIs(2)
  })

  test('should not activate a disabled matching MenuItem while searching', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem>Settings</MenuItem>
          <MenuItem disabled>Profile</MenuItem>
          <MenuItem>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible({ disabledItems: [1] })

    userEvent.click(getMenuButton())
    await nextTick()
    assertMenuIsOpen()
    assertNoActiveMenuItem()

    userEvent.keyboard('profile')
    await nextTick()
    assertNoActiveMenuItem()
  })
})
