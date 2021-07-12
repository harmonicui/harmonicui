import React from 'react'
import { render } from '@testing-library/react'
import { click, focus, Keyboard, press, type } from '../../../test-utils'
import {
  assertActiveMenuItemIs,
  assertMenuButtonIsFocused,
  assertMenuButtonIsNotFocused,
  assertMenuIsClosed,
  assertMenuIsFullyAccessible,
  assertMenuIsOpen,
  assertNoActiveMenuItem,
  getMenuButton,
} from './test-utils'
import { Menu } from '../Menu'

describe('`Space` key', () => {
  test('`Space` key should open the menu', () => {
    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List>
          <Menu.Item as="a">Settings</Menu.Item>
          <Menu.Item as="a">Profile</Menu.Item>
          <Menu.Item as="a">Sign out</Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible()
    assertMenuIsClosed()

    focus(getMenuButton())
    assertMenuButtonIsFocused()

    press(Keyboard.Space)
    assertMenuIsOpen()
    assertActiveMenuItemIs(0)
  })

  test('`Space` key should not open the menu when MenuButton is disabled', () => {
    render(
      <Menu>
        <Menu.Button disabled>Options</Menu.Button>
        <Menu.List>
          <Menu.Item as="a">Settings</Menu.Item>
          <Menu.Item as="a">Profile</Menu.Item>
          <Menu.Item as="a">Sign out</Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible()
    assertMenuIsClosed()
    expect(getMenuButton()).toBeDisabled()

    focus(getMenuButton())
    assertMenuButtonIsNotFocused()

    press(Keyboard.Space, getMenuButton())
    assertMenuIsClosed()
  })

  test('`Space` key should open the menu and focus on the first non-disabled MenuItem', () => {
    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List>
          <Menu.Item as="a" disabled>
            Settings
          </Menu.Item>
          <Menu.Item as="a">Profile</Menu.Item>
          <Menu.Item as="a">Sign out</Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible({ disabledItems: [0] })

    focus(getMenuButton())
    assertMenuButtonIsFocused()

    press(Keyboard.Space)
    assertMenuIsOpen()
    assertActiveMenuItemIs(1)
  })

  test('`Space` key should open the menu, skip all disabled MenuItems and focus on the first non-disabled one', () => {
    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List>
          <Menu.Item as="a" disabled>
            Settings
          </Menu.Item>
          <Menu.Item as="a" disabled>
            Profile
          </Menu.Item>
          <Menu.Item as="a">Sign out</Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible({ disabledItems: [0, 1] })

    focus(getMenuButton())
    assertMenuButtonIsFocused()

    press(Keyboard.Space)
    assertMenuIsOpen()
    assertActiveMenuItemIs(2)
  })

  test('`Space` key should open the menu and menu should have no active item when no MenuItem exits', () => {
    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List />
      </Menu>,
    )

    focus(getMenuButton())
    assertMenuButtonIsFocused()

    press(Keyboard.Space)
    assertMenuIsOpen()
    assertNoActiveMenuItem()
  })

  test('`Space` key should open the menu and menu should have no active item when all MenuItems are disabled', () => {
    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List>
          <Menu.Item as="a" disabled>
            Settings
          </Menu.Item>
          <Menu.Item as="a" disabled>
            Profile
          </Menu.Item>
          <Menu.Item as="a" disabled>
            Sign out
          </Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible({ disabledItems: [0, 1, 2] })

    focus(getMenuButton())
    assertMenuButtonIsFocused()

    press(Keyboard.Space)
    assertMenuIsOpen()
    assertNoActiveMenuItem()
  })

  test('`Space` key will close the menu when there is no active MenuItem', () => {
    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List>
          <Menu.Item as="a">Settings</Menu.Item>
          <Menu.Item as="a">Profile</Menu.Item>
          <Menu.Item as="a">Sign out</Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible()
    assertMenuIsClosed()

    click(getMenuButton())
    assertMenuIsOpen()
    assertNoActiveMenuItem()

    press(Keyboard.Space)
    assertMenuIsClosed()
  })

  test('`Space` key should invoke the active MenuItem and close the menu', () => {
    const clickHandler = jest.fn()

    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List>
          <Menu.Item as="a" onClick={clickHandler}>
            Settings
          </Menu.Item>
          <Menu.Item as="a">Profile</Menu.Item>
          <Menu.Item as="a">Sign out</Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible()
    assertMenuIsClosed()

    focus(getMenuButton())
    press(Keyboard.Space)
    assertMenuIsOpen()
    assertActiveMenuItemIs(0)

    press(Keyboard.Space)
    assertMenuIsClosed()
    expect(clickHandler).toHaveBeenCalled()
  })
})

describe('`Enter` key', () => {
  test('`Enter` key should open the menu', () => {
    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List>
          <Menu.Item as="a">Settings</Menu.Item>
          <Menu.Item as="a">Profile</Menu.Item>
          <Menu.Item as="a">Sign out</Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible()
    assertMenuIsClosed()

    focus(getMenuButton())
    assertMenuButtonIsFocused()

    press(Keyboard.Enter)
    assertMenuIsOpen()
    assertActiveMenuItemIs(0)
  })

  test('`Enter` key should not open the menu when MenuButton is disabled', () => {
    render(
      <Menu>
        <Menu.Button disabled>Options</Menu.Button>
        <Menu.List>
          <Menu.Item as="a">Settings</Menu.Item>
          <Menu.Item as="a">Profile</Menu.Item>
          <Menu.Item as="a">Sign out</Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible()
    assertMenuIsClosed()

    focus(getMenuButton())
    assertMenuButtonIsNotFocused()

    press(Keyboard.Space, getMenuButton())
    assertMenuIsClosed()
  })

  test('`Enter` key should open the menu and focus on the first non-disabled MenuItem', () => {
    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List>
          <Menu.Item as="a" disabled>
            Settings
          </Menu.Item>
          <Menu.Item as="a">Profile</Menu.Item>
          <Menu.Item as="a">Sign out</Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible({ disabledItems: [0] })

    focus(getMenuButton())
    assertMenuButtonIsFocused()

    press(Keyboard.Enter)
    assertMenuIsOpen()
    assertActiveMenuItemIs(1)
  })

  test('`Enter` key should open the menu, skip all disabled MenuItems and focus on the first non-disabled one', () => {
    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List>
          <Menu.Item as="a" disabled>
            Settings
          </Menu.Item>
          <Menu.Item as="a" disabled>
            Profile
          </Menu.Item>
          <Menu.Item as="a">Sign out</Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible({ disabledItems: [0, 1] })

    focus(getMenuButton())
    assertMenuButtonIsFocused()

    press(Keyboard.Enter)
    assertMenuIsOpen()
    assertActiveMenuItemIs(2)
  })

  test('`Enter` key should open the menu and menu should have no active item when no MenuItem exits', () => {
    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List />
      </Menu>,
    )

    focus(getMenuButton())
    assertMenuButtonIsFocused()

    press(Keyboard.Enter)
    assertMenuIsOpen()
    assertNoActiveMenuItem()
  })

  test('`Enter` key should open the menu and menu should have no active item when all MenuItems are disabled', () => {
    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List>
          <Menu.Item as="a" disabled>
            Settings
          </Menu.Item>
          <Menu.Item as="a" disabled>
            Profile
          </Menu.Item>
          <Menu.Item as="a" disabled>
            Sign out
          </Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible({ disabledItems: [0, 1, 2] })

    focus(getMenuButton())
    assertMenuButtonIsFocused()

    press(Keyboard.Enter)
    assertMenuIsOpen()
    assertNoActiveMenuItem()
  })

  test('`Enter` key will close the menu when there is no active MenuItem', () => {
    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List>
          <Menu.Item as="a">Settings</Menu.Item>
          <Menu.Item as="a">Profile</Menu.Item>
          <Menu.Item as="a">Sign out</Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible()
    assertMenuIsClosed()

    click(getMenuButton())
    assertMenuIsOpen()
    assertNoActiveMenuItem()

    press(Keyboard.Enter)
    assertMenuIsClosed()
  })

  test('`Enter` key should invoke the active MenuItem and close the menu', () => {
    const clickHandler = jest.fn()

    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List>
          <Menu.Item as="a" onClick={clickHandler}>
            Settings
          </Menu.Item>
          <Menu.Item as="a">Profile</Menu.Item>
          <Menu.Item as="a">Sign out</Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible()
    assertMenuIsClosed()

    focus(getMenuButton())
    press(Keyboard.Enter)
    assertMenuIsOpen()
    assertActiveMenuItemIs(0)

    press(Keyboard.Enter)
    assertMenuIsClosed()
    expect(clickHandler).toHaveBeenCalled()
  })
})

describe('`ArrowDown` key', () => {
  test('`ArrowDown` key should open the menu', () => {
    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List>
          <Menu.Item as="a">Settings</Menu.Item>
          <Menu.Item as="a">Profile</Menu.Item>
          <Menu.Item as="a">Sign out</Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible()

    focus(getMenuButton())
    assertMenuButtonIsFocused()

    press(Keyboard.ArrowDown)
    assertMenuIsOpen()
    assertActiveMenuItemIs(0)
  })

  test('`ArrowDown` key should not open the menu when MenuButton is disabled', () => {
    render(
      <Menu>
        <Menu.Button disabled>Options</Menu.Button>
        <Menu.List>
          <Menu.Item as="a">Settings</Menu.Item>
          <Menu.Item as="a">Profile</Menu.Item>
          <Menu.Item as="a">Sign out</Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible()
    assertMenuIsClosed()

    focus(getMenuButton())
    assertMenuButtonIsNotFocused()

    press(Keyboard.ArrowDown, getMenuButton())
    assertMenuIsClosed()
  })

  test('`ArrowDown` key should open the menu and menu should have no active item when no MenuItem exits', () => {
    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List />
      </Menu>,
    )

    focus(getMenuButton())
    assertMenuButtonIsFocused()

    press(Keyboard.ArrowDown)
    assertMenuIsOpen()
    assertNoActiveMenuItem()
  })

  test('`ArrowDown` key should open the menu and focus on the first non-disabled MenuItem', () => {
    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List>
          <Menu.Item as="a" disabled>
            Settings
          </Menu.Item>
          <Menu.Item as="a">Profile</Menu.Item>
          <Menu.Item as="a">Sign out</Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible({ disabledItems: [0] })

    focus(getMenuButton())
    assertMenuButtonIsFocused()

    press(Keyboard.ArrowDown)
    assertMenuIsOpen()
    assertActiveMenuItemIs(1)
  })

  test('`ArrowDown` key should open the menu, skip all disabled MenuItems and focus on the first non-disabled one', () => {
    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List>
          <Menu.Item as="a" disabled>
            Settings
          </Menu.Item>
          <Menu.Item as="a" disabled>
            Profile
          </Menu.Item>
          <Menu.Item as="a">Sign out</Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible({ disabledItems: [0, 1] })

    focus(getMenuButton())
    assertMenuButtonIsFocused()

    press(Keyboard.ArrowDown)
    assertMenuIsOpen()
    assertActiveMenuItemIs(2)
  })

  test('`ArrowDown` key should navigate the MenuItems while menu is open', () => {
    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List>
          <Menu.Item as="a">Settings</Menu.Item>
          <Menu.Item as="a">Profile</Menu.Item>
          <Menu.Item as="a">Sign out</Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible()

    focus(getMenuButton())
    assertMenuButtonIsFocused()

    press(Keyboard.ArrowDown)
    assertMenuIsOpen()
    assertActiveMenuItemIs(0)

    press(Keyboard.ArrowDown)
    assertMenuIsOpen()
    assertActiveMenuItemIs(1)

    press(Keyboard.ArrowDown)
    assertMenuIsOpen()
    assertActiveMenuItemIs(2)
  })

  test('`ArrowDown` key should navigate the MenuItems and skip the disabled MenuItems while navigating', () => {
    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List>
          <Menu.Item as="a">Settings</Menu.Item>
          <Menu.Item as="a" disabled>
            Profile
          </Menu.Item>
          <Menu.Item as="a">Sign out</Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible({ disabledItems: [1] })

    focus(getMenuButton())
    assertMenuButtonIsFocused()

    press(Keyboard.ArrowDown)
    assertMenuIsOpen()
    assertActiveMenuItemIs(0)

    press(Keyboard.ArrowDown)
    assertMenuIsOpen()
    assertActiveMenuItemIs(2)
  })

  test('`ArrowDown` key should navigate the MenuItems and skip all disabled MenuItems while navigating', () => {
    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List>
          <Menu.Item as="a">Settings</Menu.Item>
          <Menu.Item as="a" disabled>
            Profile
          </Menu.Item>
          <Menu.Item as="a" disabled>
            Help
          </Menu.Item>
          <Menu.Item as="a">Sign out</Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible({ disabledItems: [1, 2] })

    focus(getMenuButton())
    assertMenuButtonIsFocused()

    press(Keyboard.ArrowDown)
    assertMenuIsOpen()
    assertActiveMenuItemIs(0)

    press(Keyboard.ArrowDown)
    assertMenuIsOpen()
    assertActiveMenuItemIs(3)
  })

  test('`ArrowDown` key should navigate the MenuItems and stop on the last item', () => {
    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List>
          <Menu.Item as="a">Settings</Menu.Item>
          <Menu.Item as="a">Profile</Menu.Item>
          <Menu.Item as="a">Sign out</Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible()

    focus(getMenuButton())
    assertMenuButtonIsFocused()

    press(Keyboard.ArrowDown)
    assertMenuIsOpen()
    assertActiveMenuItemIs(0)

    press(Keyboard.ArrowDown)
    assertActiveMenuItemIs(1)

    press(Keyboard.ArrowDown)
    assertActiveMenuItemIs(2)

    press(Keyboard.ArrowDown)
    assertActiveMenuItemIs(2)
  })
})

describe('`ArrowUp` key', () => {
  test('`ArrowUp` key should open the menu', () => {
    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List>
          <Menu.Item as="a">Settings</Menu.Item>
          <Menu.Item as="a">Profile</Menu.Item>
          <Menu.Item as="a">Sign out</Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible()

    focus(getMenuButton())
    assertMenuButtonIsFocused()

    press(Keyboard.ArrowUp)
    assertMenuIsOpen()
    assertActiveMenuItemIs(2)
  })

  test('`ArrowUp` key should not open the menu when MenuButton is disabled', () => {
    render(
      <Menu>
        <Menu.Button disabled>Options</Menu.Button>
        <Menu.List>
          <Menu.Item as="a">Settings</Menu.Item>
          <Menu.Item as="a">Profile</Menu.Item>
          <Menu.Item as="a">Sign out</Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible()
    assertMenuIsClosed()

    focus(getMenuButton())
    assertMenuButtonIsNotFocused()

    press(Keyboard.ArrowUp, getMenuButton())
    assertMenuIsClosed()
  })

  test('`ArrowUp` key should open the menu and menu should have no active item when no MenuItem exits', () => {
    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List />
      </Menu>,
    )

    focus(getMenuButton())
    assertMenuButtonIsFocused()

    press(Keyboard.ArrowUp)
    assertMenuIsOpen()
    assertNoActiveMenuItem()
  })

  test('`ArrowUp` key should open the menu and focus on the last non-disabled MenuItem', () => {
    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List>
          <Menu.Item as="a">Settings</Menu.Item>
          <Menu.Item as="a">Profile</Menu.Item>
          <Menu.Item as="a" disabled>
            Sign out
          </Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible({ disabledItems: [2] })

    focus(getMenuButton())
    assertMenuButtonIsFocused()

    press(Keyboard.ArrowUp)
    assertMenuIsOpen()
    assertActiveMenuItemIs(1)
  })

  test('`ArrowUp` key should open the menu, skip all disabled MenuItems and focus on the first non-disabled one', () => {
    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List>
          <Menu.Item as="a">Settings</Menu.Item>
          <Menu.Item as="a" disabled>
            Profile
          </Menu.Item>
          <Menu.Item as="a" disabled>
            Sign out
          </Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible({ disabledItems: [1, 2] })

    focus(getMenuButton())
    assertMenuButtonIsFocused()

    press(Keyboard.ArrowUp)
    assertMenuIsOpen()
    assertActiveMenuItemIs(0)
  })

  test('`ArrowUp` key should navigate the MenuItems while menu is open', () => {
    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List>
          <Menu.Item as="a">Settings</Menu.Item>
          <Menu.Item as="a">Profile</Menu.Item>
          <Menu.Item as="a">Sign out</Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible()

    focus(getMenuButton())
    assertMenuButtonIsFocused()

    press(Keyboard.ArrowUp)
    assertMenuIsOpen()
    assertActiveMenuItemIs(2)

    press(Keyboard.ArrowUp)
    assertMenuIsOpen()
    assertActiveMenuItemIs(1)

    press(Keyboard.ArrowUp)
    assertMenuIsOpen()
    assertActiveMenuItemIs(0)
  })

  test('`ArrowUp` key should navigate the MenuItems and skip the disabled MenuItems while navigating', () => {
    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List>
          <Menu.Item as="a">Settings</Menu.Item>
          <Menu.Item as="a" disabled>
            Profile
          </Menu.Item>
          <Menu.Item as="a">Sign out</Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible({ disabledItems: [1] })

    focus(getMenuButton())
    assertMenuButtonIsFocused()

    press(Keyboard.ArrowUp)
    assertMenuIsOpen()
    assertActiveMenuItemIs(2)

    press(Keyboard.ArrowUp)
    assertMenuIsOpen()
    assertActiveMenuItemIs(0)
  })

  test('`ArrowUp` key should navigate the MenuItems and skip all disabled MenuItems while navigating', () => {
    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List>
          <Menu.Item as="a">Settings</Menu.Item>
          <Menu.Item as="a" disabled>
            Profile
          </Menu.Item>
          <Menu.Item as="a" disabled>
            Help
          </Menu.Item>
          <Menu.Item as="a">Sign out</Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible({ disabledItems: [1, 2] })

    focus(getMenuButton())
    assertMenuButtonIsFocused()

    press(Keyboard.ArrowUp)
    assertMenuIsOpen()
    assertActiveMenuItemIs(3)

    press(Keyboard.ArrowUp)
    assertMenuIsOpen()
    assertActiveMenuItemIs(0)
  })

  test('`ArrowUp` key should navigate the MenuItems and stop on the first item', () => {
    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List>
          <Menu.Item as="a">Settings</Menu.Item>
          <Menu.Item as="a">Profile</Menu.Item>
          <Menu.Item as="a">Sign out</Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible()

    focus(getMenuButton())
    assertMenuButtonIsFocused()

    press(Keyboard.ArrowUp)
    assertMenuIsOpen()
    assertActiveMenuItemIs(2)

    press(Keyboard.ArrowUp)
    assertActiveMenuItemIs(1)

    press(Keyboard.ArrowUp)
    assertActiveMenuItemIs(0)

    press(Keyboard.ArrowUp)
    assertActiveMenuItemIs(0)
  })
})

describe('`Escape` key', () => {
  test('`Escape` Key should close the menu', () => {
    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List>
          <Menu.Item as="a">Settings</Menu.Item>
          <Menu.Item as="a">Profile</Menu.Item>
          <Menu.Item as="a">Sign out</Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible()

    focus(getMenuButton())
    assertMenuButtonIsFocused()

    press(Keyboard.Enter)
    assertMenuIsOpen()
    assertActiveMenuItemIs(0)

    press(Keyboard.Escape)
    assertMenuIsClosed()
    assertMenuButtonIsFocused()
  })
})

describe('`End` key', () => {
  test('`End` key should jump to last MenuItem', () => {
    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List>
          <Menu.Item as="a">Settings</Menu.Item>
          <Menu.Item as="a">Profile</Menu.Item>
          <Menu.Item as="a">Sign out</Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible()

    focus(getMenuButton())
    assertMenuButtonIsFocused()

    press(Keyboard.Enter)
    assertMenuIsOpen()
    assertActiveMenuItemIs(0)

    press(Keyboard.End)
    assertActiveMenuItemIs(2)
  })

  test('`End` key should jump to last non-disabled MenuItem', () => {
    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List>
          <Menu.Item as="a">Settings</Menu.Item>
          <Menu.Item as="a">Profile</Menu.Item>
          <Menu.Item as="a" disabled>
            Sign out
          </Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible({ disabledItems: [2] })

    focus(getMenuButton())
    assertMenuButtonIsFocused()

    press(Keyboard.Enter)
    assertMenuIsOpen()
    assertActiveMenuItemIs(0)

    press(Keyboard.End)
    assertActiveMenuItemIs(1)
  })

  test('`End` key should jump to last non-disabled MenuItem (skips multiple disabled MenuItems)', () => {
    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List>
          <Menu.Item as="a">Settings</Menu.Item>
          <Menu.Item as="a" disabled>
            Profile
          </Menu.Item>
          <Menu.Item as="a" disabled>
            Sign out
          </Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible({ disabledItems: [1, 2] })

    focus(getMenuButton())
    assertMenuButtonIsFocused()

    press(Keyboard.Enter)
    assertMenuIsOpen()
    assertActiveMenuItemIs(0)

    press(Keyboard.End)
    assertActiveMenuItemIs(0)
  })

  test('`End` key should be ignored when no non-disabled MenuItems exists', () => {
    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List>
          <Menu.Item as="a" disabled>
            Settings
          </Menu.Item>
          <Menu.Item as="a" disabled>
            Profile
          </Menu.Item>
          <Menu.Item as="a" disabled>
            Sign out
          </Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible({ disabledItems: [0, 1, 2] })

    focus(getMenuButton())
    assertMenuButtonIsFocused()

    press(Keyboard.Enter)
    assertMenuIsOpen()
    assertNoActiveMenuItem()

    press(Keyboard.End)
    assertNoActiveMenuItem()
  })
})

describe('`PageDown` key', () => {
  test('`PageDown` key should jump to last MenuItem', () => {
    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List>
          <Menu.Item as="a">Settings</Menu.Item>
          <Menu.Item as="a">Profile</Menu.Item>
          <Menu.Item as="a">Sign out</Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible()

    focus(getMenuButton())
    assertMenuButtonIsFocused()

    press(Keyboard.Enter)
    assertMenuIsOpen()
    assertActiveMenuItemIs(0)

    press(Keyboard.PageDown)
    assertActiveMenuItemIs(2)
  })

  test('`PageDown` key should jump to last non-disabled MenuItem', () => {
    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List>
          <Menu.Item as="a">Settings</Menu.Item>
          <Menu.Item as="a">Profile</Menu.Item>
          <Menu.Item as="a" disabled>
            Sign out
          </Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible({ disabledItems: [2] })

    focus(getMenuButton())
    assertMenuButtonIsFocused()

    press(Keyboard.Enter)
    assertMenuIsOpen()
    assertActiveMenuItemIs(0)

    press(Keyboard.PageDown)
    assertActiveMenuItemIs(1)
  })

  test('`PageDown` key should jump to last non-disabled MenuItem (skips multiple disabled MenuItems)', () => {
    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List>
          <Menu.Item as="a">Settings</Menu.Item>
          <Menu.Item as="a" disabled>
            Profile
          </Menu.Item>
          <Menu.Item as="a" disabled>
            Sign out
          </Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible({ disabledItems: [1, 2] })

    focus(getMenuButton())
    assertMenuButtonIsFocused()

    press(Keyboard.Enter)
    assertMenuIsOpen()
    assertActiveMenuItemIs(0)

    press(Keyboard.PageDown)
    assertActiveMenuItemIs(0)
  })

  test('`PageDown` key should be ignored when no non-disabled MenuItems exists', () => {
    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List>
          <Menu.Item as="a" disabled>
            Settings
          </Menu.Item>
          <Menu.Item as="a" disabled>
            Profile
          </Menu.Item>
          <Menu.Item as="a" disabled>
            Sign out
          </Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible({ disabledItems: [0, 1, 2] })

    focus(getMenuButton())
    assertMenuButtonIsFocused()

    press(Keyboard.Enter)
    assertMenuIsOpen()
    assertNoActiveMenuItem()

    press(Keyboard.PageDown)
    assertNoActiveMenuItem()
  })
})

describe('`Home` key', () => {
  test('`Home` key should jump to first MenuItem', () => {
    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List>
          <Menu.Item as="a">Settings</Menu.Item>
          <Menu.Item as="a">Profile</Menu.Item>
          <Menu.Item as="a">Sign out</Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible()

    focus(getMenuButton())
    assertMenuButtonIsFocused()

    press(Keyboard.ArrowUp)
    assertMenuIsOpen()
    assertActiveMenuItemIs(2)

    press(Keyboard.Home)
    assertActiveMenuItemIs(0)
  })

  test('`Home` key should jump to first non-disabled MenuItem', () => {
    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List>
          <Menu.Item as="a" disabled>
            Settings
          </Menu.Item>
          <Menu.Item as="a">Profile</Menu.Item>
          <Menu.Item as="a">Sign out</Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible({ disabledItems: [0] })

    focus(getMenuButton())
    assertMenuButtonIsFocused()

    press(Keyboard.ArrowUp)
    assertMenuIsOpen()
    assertActiveMenuItemIs(2)

    press(Keyboard.Home)
    assertActiveMenuItemIs(1)
  })

  test('`Home` key should jump to first non-disabled MenuItem (skips multiple disabled MenuItems)', () => {
    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List>
          <Menu.Item as="a" disabled>
            Settings
          </Menu.Item>
          <Menu.Item as="a" disabled>
            Profile
          </Menu.Item>
          <Menu.Item as="a">Sign out</Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible({ disabledItems: [0, 1] })

    focus(getMenuButton())
    assertMenuButtonIsFocused()

    press(Keyboard.ArrowUp)
    assertMenuIsOpen()
    assertActiveMenuItemIs(2)

    press(Keyboard.Home)
    assertActiveMenuItemIs(2)
  })

  test('`Home` key should be ignored when no non-disabled MenuItems exists', () => {
    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List>
          <Menu.Item as="a" disabled>
            Settings
          </Menu.Item>
          <Menu.Item as="a" disabled>
            Profile
          </Menu.Item>
          <Menu.Item as="a" disabled>
            Sign out
          </Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible({ disabledItems: [0, 1, 2] })

    focus(getMenuButton())
    assertMenuButtonIsFocused()

    press(Keyboard.ArrowUp)
    assertMenuIsOpen()
    assertNoActiveMenuItem()

    press(Keyboard.Home)
    assertNoActiveMenuItem()
  })
})

describe('`PageUp` key', () => {
  test('`PageUp` key should jump to first MenuItem', () => {
    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List>
          <Menu.Item as="a">Settings</Menu.Item>
          <Menu.Item as="a">Profile</Menu.Item>
          <Menu.Item as="a">Sign out</Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible()

    focus(getMenuButton())
    assertMenuButtonIsFocused()

    press(Keyboard.ArrowUp)
    assertMenuIsOpen()
    assertActiveMenuItemIs(2)

    press(Keyboard.PageUp)
    assertActiveMenuItemIs(0)
  })

  test('`PageUp` key should jump to first non-disabled MenuItem', () => {
    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List>
          <Menu.Item as="a" disabled>
            Settings
          </Menu.Item>
          <Menu.Item as="a">Profile</Menu.Item>
          <Menu.Item as="a">Sign out</Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible({ disabledItems: [0] })

    focus(getMenuButton())
    assertMenuButtonIsFocused()

    press(Keyboard.ArrowUp)
    assertMenuIsOpen()
    assertActiveMenuItemIs(2)

    press(Keyboard.PageUp)
    assertActiveMenuItemIs(1)
  })

  test('`PageUp` key should jump to first non-disabled MenuItem (skips multiple disabled MenuItems)', () => {
    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List>
          <Menu.Item as="a" disabled>
            Settings
          </Menu.Item>
          <Menu.Item as="a" disabled>
            Profile
          </Menu.Item>
          <Menu.Item as="a">Sign out</Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible({ disabledItems: [0, 1] })

    focus(getMenuButton())
    assertMenuButtonIsFocused()

    press(Keyboard.ArrowUp)
    assertMenuIsOpen()
    assertActiveMenuItemIs(2)

    press(Keyboard.PageUp)
    assertActiveMenuItemIs(2)
  })

  test('`PageUp` key should be ignored when no non-disabled MenuItems exists', () => {
    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List>
          <Menu.Item as="a" disabled>
            Settings
          </Menu.Item>
          <Menu.Item as="a" disabled>
            Profile
          </Menu.Item>
          <Menu.Item as="a" disabled>
            Sign out
          </Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible({ disabledItems: [0, 1, 2] })

    focus(getMenuButton())
    assertMenuButtonIsFocused()

    press(Keyboard.ArrowUp)
    assertMenuIsOpen()
    assertNoActiveMenuItem()

    press(Keyboard.PageUp)
    assertNoActiveMenuItem()
  })
})

describe('`Any` key / searching', () => {
  test('typing a single character should jump to the first matching MenuItem', () => {
    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List>
          <Menu.Item as="a">Settings</Menu.Item>
          <Menu.Item as="a">Profile</Menu.Item>
          <Menu.Item as="a">Sign out</Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible()

    click(getMenuButton())
    assertMenuIsOpen()
    assertNoActiveMenuItem()

    type('P')
    assertActiveMenuItemIs(1)

    type('S')
    assertActiveMenuItemIs(0)
  })

  test('typing a single character (case-insensitive) should jump to the first matching MenuItem', () => {
    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List>
          <Menu.Item as="a">Settings</Menu.Item>
          <Menu.Item as="a">Profile</Menu.Item>
          <Menu.Item as="a">Sign out</Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible()

    click(getMenuButton())
    assertMenuIsOpen()
    assertNoActiveMenuItem()

    type('p')
    assertActiveMenuItemIs(1)

    type('s')
    assertActiveMenuItemIs(0)
  })

  test('typing a full world should jump to the first matching MenuItem', () => {
    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List>
          <Menu.Item as="a">Settings</Menu.Item>
          <Menu.Item as="a">Profile</Menu.Item>
          <Menu.Item as="a">Sign out</Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible()

    click(getMenuButton())
    assertMenuIsOpen()
    assertNoActiveMenuItem()

    type('Profile')
    assertActiveMenuItemIs(1)

    type('Settings')
    assertActiveMenuItemIs(0)
  })

  test('typing a full world (case-insensitive) should jump to the first matching MenuItem', () => {
    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List>
          <Menu.Item as="a">Settings</Menu.Item>
          <Menu.Item as="a">Profile</Menu.Item>
          <Menu.Item as="a">Sign out</Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible()

    click(getMenuButton())
    assertMenuIsOpen()
    assertNoActiveMenuItem()

    type('profile')
    assertActiveMenuItemIs(1)

    type('settings')
    assertActiveMenuItemIs(0)
  })

  test('typing a world partially should jump to the first matching MenuItem', () => {
    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List>
          <Menu.Item as="a">Settings</Menu.Item>
          <Menu.Item as="a">Profile</Menu.Item>
          <Menu.Item as="a">Sign out</Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible()

    click(getMenuButton())
    assertMenuIsOpen()
    assertNoActiveMenuItem()

    type('prof')
    assertActiveMenuItemIs(1)

    type('sig')
    assertActiveMenuItemIs(2)

    type('se')
    assertActiveMenuItemIs(0)
  })

  test('typing a world which contains whitespaces should jump to the first matching MenuItem', () => {
    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List>
          <Menu.Item as="a">Settings</Menu.Item>
          <Menu.Item as="a">Profile</Menu.Item>
          <Menu.Item as="a">Sign out</Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible()

    click(getMenuButton())
    assertMenuIsOpen()
    assertNoActiveMenuItem()

    type('sign out')
    assertActiveMenuItemIs(2)
  })

  test('should not activate a disabled matching MenuItem while searching', () => {
    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List>
          <Menu.Item as="a">Settings</Menu.Item>
          <Menu.Item as="a" disabled>
            Profile
          </Menu.Item>
          <Menu.Item as="a">Sign out</Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible({ disabledItems: [1] })

    click(getMenuButton())
    assertMenuIsOpen()
    assertNoActiveMenuItem()

    type('profile')
    assertNoActiveMenuItem()
  })
})
