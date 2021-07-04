import { nextTick } from 'vue'
import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/react'
import {
  assertActiveMenuItemIs,
  assertMenuButtonIsFocused,
  assertMenuIsClosed,
  assertMenuIsFullyAccessible,
  assertMenuIsOpen,
  assertNoActiveMenuItem,
  getMenuButton,
  getMenuItems,
  render,
} from './test-utils'

it('`Click` on MenuButton should open the menu', async () => {
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
})

it('`Right Click` on MenuButton should not open the menu', async () => {
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

  userEvent.click(getMenuButton(), { button: 2 })
  await nextTick()
  assertMenuIsFullyAccessible()
  assertMenuIsClosed()
})

it('`Click` on MenuButton should not open the menu when MenuButton is disabled', async () => {
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
  expect(getMenuButton()).toBeDisabled()

  userEvent.click(getMenuButton())
  await nextTick()
  assertMenuIsClosed()
})

it('`Click` on MenuButton should close the menu when its open', async () => {
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

  userEvent.click(getMenuButton())
  await nextTick()
  assertMenuIsClosed()
  assertMenuButtonIsFocused()
})

it('`Click` outside of the Menu should close the menu', async () => {
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

  userEvent.click(document.body)
  await nextTick()
  assertMenuIsClosed()
  assertMenuButtonIsFocused()
})

it('`Click` outside of the Menu should do noting when the menu is closed', async () => {
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

  userEvent.click(document.body)
  await nextTick()
  assertMenuIsClosed()
})

it('`Click` outside of the menu on another MenuButton should close the currently opened menu and open the new menu', async () => {
  render(`
    <Menu>
      <MenuButton>Options</MenuButton>
      <MenuList>
        <MenuItem>Settings</MenuItem>
        <MenuItem>Profile</MenuItem>
        <MenuItem>Sign out</MenuItem>
      </MenuList>
    </Menu>

    <Menu>
      <MenuButton>Edit</MenuButton>
      <MenuList>
        <MenuItem>Undo</MenuItem>
        <MenuItem>Redo</MenuItem>
        <MenuItem>Copy</MenuItem>
        <MenuItem>Paste</MenuItem>
      </MenuList>
    </Menu>
  `)

  await nextTick()

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

  userEvent.click(optionsMenu.menuButton)
  await nextTick()
  assertMenuIsOpen(optionsMenu)

  userEvent.click(editMenu.menuButton)
  await nextTick()
  assertMenuIsClosed(optionsMenu)
  assertMenuIsOpen(editMenu)
})

it('`Hover` on a MenuItem should activate it', async () => {
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

  userEvent.hover(getMenuItems()[1])
  await nextTick()
  assertActiveMenuItemIs(1)

  userEvent.hover(getMenuItems()[2])
  await nextTick()
  assertActiveMenuItemIs(2)

  userEvent.hover(getMenuItems()[0])
  await nextTick()
  assertActiveMenuItemIs(0)

  userEvent.hover(getMenuItems()[1])
  await nextTick()
  assertActiveMenuItemIs(1)
})

it('`Hover` on an already activated MenuItem should do nothing', async () => {
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

  userEvent.hover(getMenuItems()[1])
  await nextTick()
  assertActiveMenuItemIs(1)

  userEvent.hover(getMenuItems()[1])
  await nextTick()
  assertActiveMenuItemIs(1)
})

it('`Hover` on a disable MenuItem should not activate it', async () => {
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
  assertMenuIsClosed()

  userEvent.click(getMenuButton())
  await nextTick()
  assertMenuIsOpen()
  assertNoActiveMenuItem()

  userEvent.hover(getMenuItems()[1])
  await nextTick()
  assertNoActiveMenuItem()
})

it('`UnHover` an already active MenuItem should inactivate it', async () => {
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

  userEvent.hover(getMenuItems()[1])
  await nextTick()
  assertActiveMenuItemIs(1)

  userEvent.unhover(getMenuItems()[1])
  await nextTick()
  assertNoActiveMenuItem()
})

it('`UnHover` a disabled MenuItem should do nothing', async () => {
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
  assertMenuIsClosed()

  userEvent.click(getMenuButton())
  await nextTick()
  assertMenuIsOpen()
  assertNoActiveMenuItem()

  userEvent.hover(getMenuItems()[0])
  await nextTick()
  assertActiveMenuItemIs(0)

  userEvent.hover(getMenuItems()[1])
  await nextTick()
  assertActiveMenuItemIs(0)

  userEvent.unhover(getMenuItems()[1])
  await nextTick()
  assertActiveMenuItemIs(0)
})

it('`Click` on a MenuItem should invoke a clickEvent on it an closes the menu', async () => {
  const clickHandler = jest.fn()

  render({
    template: `
      <Menu>
      <MenuButton>Options</MenuButton>
      <MenuList>
        <MenuItem>Settings</MenuItem>
        <MenuItem @click='clickHandler'>Profile</MenuItem>
        <MenuItem>Sign out</MenuItem>
      </MenuList>
      </Menu>
    `,
    setup: () => ({ clickHandler }),
  })

  await nextTick()
  assertMenuIsFullyAccessible()
  assertMenuIsClosed()

  userEvent.click(getMenuButton())
  await nextTick()
  assertMenuIsOpen()
  assertNoActiveMenuItem()

  userEvent.click(getMenuItems()[1])
  await nextTick()
  assertMenuIsClosed()
  expect(clickHandler).toHaveBeenCalled()
})

it('`Click` on a disabled MenuItem should do nothing', async () => {
  const clickHandler = jest.fn()

  render({
    template: `
      <Menu>
      <MenuButton>Options</MenuButton>
      <MenuList>
        <MenuItem>Settings</MenuItem>
        <MenuItem disabled @click='clickHandler'>Profile</MenuItem>
        <MenuItem>Sign out</MenuItem>
      </MenuList>
      </Menu>
    `,
    setup: () => ({ clickHandler }),
  })

  await nextTick()
  assertMenuIsFullyAccessible({ disabledItems: [1] })
  assertMenuIsClosed()

  userEvent.click(getMenuButton())
  await nextTick()
  assertMenuIsOpen()
  assertNoActiveMenuItem()

  userEvent.click(getMenuItems()[1])
  await nextTick()
  assertMenuIsOpen()
  expect(clickHandler).not.toHaveBeenCalled()
})

it('`Focus` on a MenuItem should activate it', async () => {
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

  getMenuItems()[1].focus()
  await nextTick()
  assertActiveMenuItemIs(1)
})

it('should not be possible to `Focus` on a disabled MenuItem', async () => {
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
  assertMenuIsClosed()

  userEvent.click(getMenuButton())
  await nextTick()
  assertMenuIsOpen()
  assertNoActiveMenuItem()

  getMenuItems()[1].focus()
  await nextTick()
  assertNoActiveMenuItem()
})
