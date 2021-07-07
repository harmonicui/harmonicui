import { nextTick } from 'vue'
import { screen } from '@testing-library/vue'
import { click, focus, hover, unHover } from '../../test-utils'
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
})

it('`Right Click` on MenuButton should not open the menu', async () => {
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

  await click(getMenuButton(), { button: 2 })
  assertMenuIsFullyAccessible()
  assertMenuIsClosed()
})

it('`Click` on MenuButton should not open the menu when MenuButton is disabled', async () => {
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
  expect(getMenuButton()).toBeDisabled()

  await click(getMenuButton())
  assertMenuIsClosed()
})

it('`Click` on MenuButton should close the menu when its open', async () => {
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

  await click(getMenuButton())
  assertMenuIsClosed()
  assertMenuButtonIsFocused()
})

it('`Click` outside of the Menu should close the menu', async () => {
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

  await click(document.body)
  assertMenuIsClosed()
  assertMenuButtonIsFocused()
})

it('`Click` outside of the Menu should do noting when the menu is closed', async () => {
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

  await click(document.body)
  assertMenuIsClosed()
})

it('`Click` outside of the menu on another MenuButton should close the currently opened menu and open the new menu', async () => {
  render(`
    <Menu>
      <MenuButton>Options</MenuButton>
      <MenuList>
        <MenuItem as='a'>Settings</MenuItem>
        <MenuItem as='a'>Profile</MenuItem>
        <MenuItem as='a'>Sign out</MenuItem>
      </MenuList>
    </Menu>

    <Menu>
      <MenuButton>Edit</MenuButton>
      <MenuList>
        <MenuItem as='a'>Undo</MenuItem>
        <MenuItem as='a'>Redo</MenuItem>
        <MenuItem as='a'>Copy</MenuItem>
        <MenuItem as='a'>Paste</MenuItem>
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

  await click(optionsMenu.menuButton)
  assertMenuIsOpen(optionsMenu)

  await click(editMenu.menuButton)
  assertMenuIsClosed(optionsMenu)
  assertMenuIsOpen(editMenu)
})

it('`Hover` on a MenuItem should activate it', async () => {
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

  await hover(getMenuItems()[1])
  assertActiveMenuItemIs(1)

  await hover(getMenuItems()[2])
  assertActiveMenuItemIs(2)

  await hover(getMenuItems()[0])
  assertActiveMenuItemIs(0)

  await hover(getMenuItems()[1])
  assertActiveMenuItemIs(1)
})

it('`Hover` on an already activated MenuItem should do nothing', async () => {
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

  await hover(getMenuItems()[1])
  assertActiveMenuItemIs(1)

  await hover(getMenuItems()[1])
  assertActiveMenuItemIs(1)
})

it('`Hover` on a disable MenuItem should not activate it', async () => {
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
  assertMenuIsClosed()

  await click(getMenuButton())
  assertMenuIsOpen()
  assertNoActiveMenuItem()

  await hover(getMenuItems()[1])
  assertNoActiveMenuItem()
})

it('`UnHover` an already active MenuItem should inactivate it', async () => {
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

  await hover(getMenuItems()[1])
  assertActiveMenuItemIs(1)

  await unHover(getMenuItems()[1])
  assertNoActiveMenuItem()
})

it('`UnHover` a disabled MenuItem should do nothing', async () => {
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
  assertMenuIsClosed()

  await click(getMenuButton())
  assertMenuIsOpen()
  assertNoActiveMenuItem()

  await hover(getMenuItems()[0])
  assertActiveMenuItemIs(0)

  await hover(getMenuItems()[1])
  assertActiveMenuItemIs(0)

  await unHover(getMenuItems()[1])
  assertActiveMenuItemIs(0)
})

it('`Click` on a MenuItem should invoke a clickEvent on it an closes the menu', async () => {
  const clickHandler = jest.fn()

  render({
    template: `
      <Menu>
      <MenuButton>Options</MenuButton>
      <MenuList>
        <MenuItem as='a'>Settings</MenuItem>
        <MenuItem as='a' @click='clickHandler'>Profile</MenuItem>
        <MenuItem as='a'>Sign out</MenuItem>
      </MenuList>
      </Menu>
    `,
    setup: () => ({ clickHandler }),
  })

  await nextTick()
  assertMenuIsFullyAccessible()
  assertMenuIsClosed()

  await click(getMenuButton())
  assertMenuIsOpen()
  assertNoActiveMenuItem()

  await click(getMenuItems()[1])
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
        <MenuItem as='a'>Settings</MenuItem>
        <MenuItem as='a' disabled @click='clickHandler'>Profile</MenuItem>
        <MenuItem as='a'>Sign out</MenuItem>
      </MenuList>
      </Menu>
    `,
    setup: () => ({ clickHandler }),
  })

  await nextTick()
  assertMenuIsFullyAccessible({ disabledItems: [1] })
  assertMenuIsClosed()

  await click(getMenuButton())
  assertMenuIsOpen()
  assertNoActiveMenuItem()

  await click(getMenuItems()[1])
  assertMenuIsOpen()
  expect(clickHandler).not.toHaveBeenCalled()
})

it('`Focus` on a MenuItem should activate it', async () => {
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

  await focus(getMenuItems()[1])
  assertActiveMenuItemIs(1)
})

it('should not be possible to `Focus` on a disabled MenuItem', async () => {
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
  assertMenuIsClosed()

  await click(getMenuButton())
  assertMenuIsOpen()
  assertNoActiveMenuItem()

  await focus(getMenuItems()[1])
  assertNoActiveMenuItem()
})
