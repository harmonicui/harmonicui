import React from 'react'
import { render, screen } from '@testing-library/react'
import { click, focus, hover, unHover } from '../../../test-utils'
import {
  assertActiveMenuItemIs,
  assertMenuButtonIsFocused,
  assertMenuIsClosed,
  assertMenuIsFullyAccessible,
  assertMenuIsOpen,
  assertNoActiveMenuItem,
  getMenuButton,
  getMenuItems,
} from './test-utils'
import { Menu } from '../Menu'

test('`Click` on MenuButton should open the menu', () => {
  render(
    <Menu>
      <Menu.Button>Options</Menu.Button>
      <Menu.List>
        <Menu.Item>Settings</Menu.Item>
        <Menu.Item>Profile</Menu.Item>
        <Menu.Item>Sign out</Menu.Item>
      </Menu.List>
    </Menu>,
  )

  assertMenuIsFullyAccessible()
  assertMenuIsClosed()

  click(getMenuButton())
  assertMenuIsOpen()
  assertNoActiveMenuItem()
})

test('`Right Click` on MenuButton should not open the menu', () => {
  render(
    <Menu>
      <Menu.Button>Options</Menu.Button>
      <Menu.List>
        <Menu.Item>Settings</Menu.Item>
        <Menu.Item>Profile</Menu.Item>
        <Menu.Item>Sign out</Menu.Item>
      </Menu.List>
    </Menu>,
  )

  assertMenuIsFullyAccessible()

  assertMenuIsClosed()
  click(getMenuButton(), { button: 2 })
  assertMenuIsFullyAccessible()
  assertMenuIsClosed()
})

test('`Click` on MenuButton should not open the menu when MenuButton is disabled', () => {
  render(
    <Menu>
      <Menu.Button disabled>Options</Menu.Button>
      <Menu.List>
        <Menu.Item>Settings</Menu.Item>
        <Menu.Item>Profile</Menu.Item>
        <Menu.Item>Sign out</Menu.Item>
      </Menu.List>
    </Menu>,
  )

  assertMenuIsFullyAccessible()
  expect(getMenuButton()).toBeDisabled()
  assertMenuIsClosed()

  click(getMenuButton())
  assertMenuIsClosed()
})

test('`Click` on MenuButton should close the menu when its open', () => {
  render(
    <Menu>
      <Menu.Button>Options</Menu.Button>
      <Menu.List>
        <Menu.Item>Settings</Menu.Item>
        <Menu.Item>Profile</Menu.Item>
        <Menu.Item>Sign out</Menu.Item>
      </Menu.List>
    </Menu>,
  )

  assertMenuIsFullyAccessible()
  assertMenuIsClosed()

  click(getMenuButton())
  assertMenuIsOpen()
  assertNoActiveMenuItem()

  click(getMenuButton())
  assertMenuIsClosed()
  assertMenuButtonIsFocused()
})

test('`Click` outside of the Menu should close the menu', () => {
  render(
    <Menu>
      <Menu.Button>Options</Menu.Button>
      <Menu.List>
        <Menu.Item>Settings</Menu.Item>
        <Menu.Item>Profile</Menu.Item>
        <Menu.Item>Sign out</Menu.Item>
      </Menu.List>
    </Menu>,
  )

  assertMenuIsFullyAccessible()
  assertMenuIsClosed()

  click(getMenuButton())
  assertMenuIsOpen()
  assertNoActiveMenuItem()

  click(document.body)
  assertMenuIsClosed()
  assertMenuButtonIsFocused()
})

test('`Click` outside of the Menu should do noting when the menu is closed', () => {
  render(
    <Menu>
      <Menu.Button>Options</Menu.Button>
      <Menu.List>
        <Menu.Item>Settings</Menu.Item>
        <Menu.Item>Profile</Menu.Item>
        <Menu.Item>Sign out</Menu.Item>
      </Menu.List>
    </Menu>,
  )

  assertMenuIsFullyAccessible()
  assertMenuIsClosed()

  click(document.body)
  assertMenuIsClosed()
})

test('`Click` outside of the menu on another MenuButton should close the currently opened menu and open the new menu', () => {
  render(
    <>
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List>
          <Menu.Item>Settings</Menu.Item>
          <Menu.Item>Profile</Menu.Item>
          <Menu.Item>Sign out</Menu.Item>
        </Menu.List>
      </Menu>

      <Menu>
        <Menu.Button>Edit</Menu.Button>
        <Menu.List>
          <Menu.Item>Undo</Menu.Item>
          <Menu.Item>Redo</Menu.Item>
          <Menu.Item>Copy</Menu.Item>
          <Menu.Item>Paste</Menu.Item>
        </Menu.List>
      </Menu>
    </>,
  )

  const optionsMenu = {
    menuButton: screen.getAllByRole('button')[0],
    menuList: screen.getAllByRole('menu', { hidden: true })[0],
  }

  const editMenu = {
    menuButton: screen.getAllByRole('button')[1],
    menuList: screen.getAllByRole('menu', { hidden: true })[1],
  }

  assertMenuIsFullyAccessible(optionsMenu)
  assertMenuIsClosed(optionsMenu)
  assertMenuIsFullyAccessible(editMenu)
  assertMenuIsClosed(editMenu)

  click(optionsMenu.menuButton)
  assertMenuIsOpen(optionsMenu)

  click(editMenu.menuButton)
  assertMenuIsClosed(optionsMenu)
  assertMenuIsOpen(editMenu)
})

test('`Hover` on a MenuItem should activate it', () => {
  render(
    <Menu>
      <Menu.Button>Options</Menu.Button>
      <Menu.List>
        <Menu.Item>Settings</Menu.Item>
        <Menu.Item>Profile</Menu.Item>
        <Menu.Item>Sign out</Menu.Item>
      </Menu.List>
    </Menu>,
  )

  assertMenuIsFullyAccessible()
  assertMenuIsClosed()

  click(getMenuButton())
  assertMenuIsOpen()
  assertNoActiveMenuItem()

  hover(getMenuItems()[1])
  assertActiveMenuItemIs(1)

  hover(getMenuItems()[2])
  assertActiveMenuItemIs(2)

  hover(getMenuItems()[0])
  assertActiveMenuItemIs(0)

  hover(getMenuItems()[1])
  assertActiveMenuItemIs(1)
})

test('`Hover` on an already activated MenuItem should do nothing', () => {
  render(
    <Menu>
      <Menu.Button>Options</Menu.Button>
      <Menu.List>
        <Menu.Item>Settings</Menu.Item>
        <Menu.Item>Profile</Menu.Item>
        <Menu.Item>Sign out</Menu.Item>
      </Menu.List>
    </Menu>,
  )

  assertMenuIsFullyAccessible()
  assertMenuIsClosed()

  click(getMenuButton())
  assertMenuIsOpen()
  assertNoActiveMenuItem()

  hover(getMenuItems()[1])
  assertActiveMenuItemIs(1)

  hover(getMenuItems()[1])
  assertActiveMenuItemIs(1)
})

test('`Hover` on a disable MenuItem should not activate it', () => {
  render(
    <Menu>
      <Menu.Button>Options</Menu.Button>
      <Menu.List>
        <Menu.Item>Settings</Menu.Item>
        <Menu.Item disabled>Profile</Menu.Item>
        <Menu.Item>Sign out</Menu.Item>
      </Menu.List>
    </Menu>,
  )

  assertMenuIsFullyAccessible({ disabledItems: [1] })
  assertMenuIsClosed()

  click(getMenuButton())
  assertMenuIsOpen()
  assertNoActiveMenuItem()

  hover(getMenuItems()[1])
  assertNoActiveMenuItem()
})

test('`UnHover` an already active MenuItem should inactivate it', () => {
  render(
    <Menu>
      <Menu.Button>Options</Menu.Button>
      <Menu.List>
        <Menu.Item>Settings</Menu.Item>
        <Menu.Item>Profile</Menu.Item>
        <Menu.Item>Sign out</Menu.Item>
      </Menu.List>
    </Menu>,
  )

  assertMenuIsFullyAccessible()
  assertMenuIsClosed()

  click(getMenuButton())
  assertMenuIsOpen()
  assertNoActiveMenuItem()

  hover(getMenuItems()[1])
  assertActiveMenuItemIs(1)

  unHover(getMenuItems()[1])
  assertNoActiveMenuItem()
})

test('`UnHover` a disabled MenuItem should do nothing', () => {
  render(
    <Menu>
      <Menu.Button>Options</Menu.Button>
      <Menu.List>
        <Menu.Item>Settings</Menu.Item>
        <Menu.Item disabled>Profile</Menu.Item>
        <Menu.Item>Sign out</Menu.Item>
      </Menu.List>
    </Menu>,
  )

  assertMenuIsFullyAccessible({ disabledItems: [1] })
  assertMenuIsClosed()

  click(getMenuButton())
  assertMenuIsOpen()
  assertNoActiveMenuItem()

  hover(getMenuItems()[0])
  assertActiveMenuItemIs(0)

  hover(getMenuItems()[1])
  assertActiveMenuItemIs(0)

  unHover(getMenuItems()[1])
  assertActiveMenuItemIs(0)
})

test('`Click` on a MenuItem should invoke a clickEvent on it and closes the menu', () => {
  const clickHandler = jest.fn()

  render(
    <Menu>
      <Menu.Button>Options</Menu.Button>
      <Menu.List>
        <Menu.Item>Settings</Menu.Item>
        <Menu.Item onClick={clickHandler}>Profile</Menu.Item>
        <Menu.Item>Sign out</Menu.Item>
      </Menu.List>
    </Menu>,
  )

  assertMenuIsFullyAccessible()
  assertMenuIsClosed()

  click(getMenuButton())
  assertMenuIsOpen()
  assertNoActiveMenuItem()

  click(getMenuItems()[1])
  assertMenuIsClosed()
  expect(clickHandler).toHaveBeenCalled()
})

test('`Click` on a disabled MenuItem should do nothing', () => {
  const clickHandler = jest.fn()

  render(
    <Menu>
      <Menu.Button>Options</Menu.Button>
      <Menu.List>
        <Menu.Item>Settings</Menu.Item>
        <Menu.Item disabled onClick={clickHandler}>
          Profile
        </Menu.Item>
        <Menu.Item>Sign out</Menu.Item>
      </Menu.List>
    </Menu>,
  )

  assertMenuIsFullyAccessible({ disabledItems: [1] })
  assertMenuIsClosed()

  click(getMenuButton())
  assertMenuIsOpen()
  assertNoActiveMenuItem()

  click(getMenuItems()[1])
  assertMenuIsOpen()
  expect(clickHandler).not.toHaveBeenCalled()
})

test('`Focus` on a MenuItem should activate it', () => {
  render(
    <Menu>
      <Menu.Button>Options</Menu.Button>
      <Menu.List>
        <Menu.Item>Settings</Menu.Item>
        <Menu.Item>Profile</Menu.Item>
        <Menu.Item>Sign out</Menu.Item>
      </Menu.List>
    </Menu>,
  )

  assertMenuIsFullyAccessible()
  assertMenuIsClosed()

  click(getMenuButton())
  assertMenuIsOpen()
  assertNoActiveMenuItem()

  focus(getMenuItems()[1])
  assertActiveMenuItemIs(1)
})

test('should not be possible to `Focus` on a disabled MenuItem', () => {
  render(
    <Menu>
      <Menu.Button>Options</Menu.Button>
      <Menu.List>
        <Menu.Item>Settings</Menu.Item>
        <Menu.Item disabled>Profile</Menu.Item>
        <Menu.Item>Sign out</Menu.Item>
      </Menu.List>
    </Menu>,
  )

  assertMenuIsFullyAccessible({ disabledItems: [1] })
  assertMenuIsClosed()

  click(getMenuButton())
  assertMenuIsOpen()
  assertNoActiveMenuItem()

  focus(getMenuItems()[1])
  assertNoActiveMenuItem()
})
