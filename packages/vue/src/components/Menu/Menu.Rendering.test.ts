import { defineComponent, nextTick } from 'vue'
import { screen } from '@testing-library/vue'
import { Keyboard, press, suppressWarnings } from '../../test-utils'
import {
  assertActiveMenuItemIs,
  assertMenuIsClosed,
  assertMenuIsFullyAccessible,
  assertMenuIsOpen,
  getMenuButton,
  getMenuItems,
  getMenuList,
  render,
} from './test-utils'
import { Menu, MenuState } from './Menu'
import { MenuButton } from './MenuButton'
import { MenuItem } from './MenuItem'
import { MenuList } from './MenuList'

function getMenu() {
  return screen.getByTestId('menu')
}

describe('Menu', () => {
  test('should be named properly', () => {
    expect(Menu).toHaveBeenNamed('Menu')
  })

  test(
    'should render as fragment by default (passing attrs will cause error)',
    suppressWarnings(() => {
      expect(() => {
        render(`
          <Menu data-testid='menu'>
            <MenuButton>Options</MenuButton>
            <MenuList>
              <MenuItem as='a'>Settings</MenuItem>
              <MenuItem as='a'>Profile</MenuItem>
              <MenuItem as='a'>Sign out</MenuItem>
            </MenuList>
          </Menu>
        `)
      }).toThrowError(
        /Unable to pass props to fragment(.+?)<Menu \/> component/s,
      )
    }),
  )

  test('can be rendered as any html element', async () => {
    render(`
      <Menu as='div' data-testid='menu'>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem as='a'>Settings</MenuItem>
          <MenuItem as='a'>Profile</MenuItem>
          <MenuItem as='a'>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    expect(getMenu()).toBeInstanceOf(HTMLDivElement)
  })

  test('should render default slot contents', () => {
    render(`
      <Menu as='div' data-testid='menu'>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem as='a'>Settings</MenuItem>
          <MenuItem as='a'>Profile</MenuItem>
          <MenuItem as='a'>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    expect(getMenu()).toHaveTextContent(
      ['Options', 'Settings', 'Profile', 'Sign out'].join(''),
    )
  })

  test('can be rendered as any custom component', async () => {
    const CustomComponent = defineComponent({
      template: `
        <div class='align-center'>
          <slot></slot>
        </div>`,
    })

    render({
      template: `
        <Menu :as='CustomComponent' data-testid='menu'>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem as='a'>Settings</MenuItem>
          <MenuItem as='a'>Profile</MenuItem>
          <MenuItem as='a'>Sign out</MenuItem>
        </MenuList>
        </Menu>
      `,
      setup: () => ({ CustomComponent }),
    })

    await nextTick()
    assertMenuIsFullyAccessible()
    expect(getMenu()).toBeInstanceOf(HTMLDivElement)
    expect(getMenu()).toHaveClass('align-center')
    expect(getMenu()).toHaveTextContent(
      ['Options', 'Settings', 'Profile', 'Sign out'].join(''),
    )
  })

  test('forwards attrs to the rendered element', async () => {
    render(`
      <Menu as='div' class='margin-x-auto' data-testid='menu' id='menu'>
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
    expect(getMenu()).toBeInstanceOf(HTMLDivElement)
    expect(getMenu()).toHaveClass('margin-x-auto')
    expect(getMenu()).toHaveAttribute('id', 'menu')
  })

  test('should be possible render as fragment and pass its attrs to child node', async () => {
    render(`
      <Menu id='menu' data-testid='menu'>
        <div class='margin-x-auto'>
          <MenuButton>Options</MenuButton>
          <MenuList>
            <MenuItem as='a'>Settings</MenuItem>
            <MenuItem as='a'>Profile</MenuItem>
            <MenuItem as='a'>Sign out</MenuItem>
          </MenuList>
        </div>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()
    expect(getMenu()).toBeInstanceOf(HTMLDivElement)
    expect(getMenu()).toHaveClass('margin-x-auto')
    expect(getMenu()).toHaveAttribute('id', 'menu')
  })

  test('should expose MenuState through its default slot', async () => {
    render(`
      <Menu v-slot='{ isOpen }'>
        <MenuButton :class="{ 'border-blue': isOpen }">Options</MenuButton>
        <MenuList>
          <MenuItem as='a'>Settings</MenuItem>
          <MenuItem as='a'>Profile</MenuItem>
          <MenuItem as='a'>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsClosed()
    expect(getMenuButton()).not.toHaveClass('border-blue')

    await press(Keyboard.Space, getMenuButton())
    assertMenuIsOpen()
    expect(getMenuButton()).toHaveClass('border-blue')
  })
})

describe('MenuButton', () => {
  test('should be named properly', () => {
    expect(MenuButton).toHaveBeenNamed('MenuButton')
  })

  test('should render as `button` by default', () => {
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

    expect(getMenuButton()).toBeInstanceOf(HTMLButtonElement)
  })

  test('should render default slot contents', () => {
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

    expect(getMenuButton()).toHaveTextContent('Options')
  })

  test('can be rendered as any html element', async () => {
    render(`
      <Menu>
        <MenuButton as='a'>Options</MenuButton>
        <MenuList>
          <MenuItem as='a'>Settings</MenuItem>
          <MenuItem as='a'>Profile</MenuItem>
          <MenuItem as='a'>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()
    expect(getMenuButton()).toBeInstanceOf(HTMLAnchorElement)
  })

  test('can be rendered as any custom component', async () => {
    const customComponent = defineComponent({
      template: `
        <span class='color-red'>
          <slot></slot>
        </span>`,
    })

    render({
      template: `
        <Menu>
        <MenuButton :as='customComponent'>Options</MenuButton>
        <MenuList>
          <MenuItem as='a'>Settings</MenuItem>
          <MenuItem as='a'>Profile</MenuItem>
          <MenuItem as='a'>Sign out</MenuItem>
        </MenuList>
        </Menu>
      `,
      setup: () => ({ customComponent }),
    })

    await nextTick()
    assertMenuIsFullyAccessible()
    expect(getMenuButton()).toBeInstanceOf(HTMLSpanElement)
    expect(getMenuButton()).toHaveClass('color-red')
    expect(getMenuButton()).toHaveTextContent('Options')
  })

  test('forwards attrs to the rendered element', async () => {
    render(`
      <Menu>
        <MenuButton class='bg-green' dir='rtl' data-test-id='test-id'>Options</MenuButton>
        <MenuList>
          <MenuItem as='a'>Settings</MenuItem>
          <MenuItem as='a'>Profile</MenuItem>
          <MenuItem as='a'>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()
    expect(getMenuButton()).toHaveClass('bg-green')
    expect(getMenuButton()).toHaveAttribute('dir', 'rtl')
    expect(getMenuButton()).toHaveAttribute('data-test-id', 'test-id')
  })

  test('should be possible render as fragment and pass its props to child node', async () => {
    render(`
      <Menu>
        <MenuButton as='fragment'>
          <button>Options</button>
        </MenuButton>
        <MenuList>
          <MenuItem as='a'>Settings</MenuItem>
          <MenuItem as='a'>Profile</MenuItem>
          <MenuItem as='a'>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()
    expect(getMenuButton()).toBeInstanceOf(HTMLButtonElement)
    expect(getMenuButton()).toHaveTextContent('Options')
  })

  test('should not be possible to override controlled props', async () => {
    render(`
      <Menu>
        <MenuButton role='alert' aria-expanded='true' aria-controls='fake-id'>
          Options
        </MenuButton>
        <MenuList>
          <MenuItem as='a'>Settings</MenuItem>
          <MenuItem as='a'>Profile</MenuItem>
          <MenuItem as='a'>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()
    expect(getMenuButton()).not.toHaveAttribute('role', 'alert')
    expect(getMenuButton()).not.toHaveAttribute('aria-expanded', 'true')
    expect(getMenuButton()).not.toHaveAttribute('aria-controls', 'fake-id')
  })

  test('should be possible to override the id', async () => {
    render(`
      <Menu>
        <MenuButton id='menu-button'>Options</MenuButton>
        <MenuList>
          <MenuItem as='a'>Settings</MenuItem>
          <MenuItem as='a'>Profile</MenuItem>
          <MenuItem as='a'>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()
    expect(getMenuButton()).toHaveAttribute('id', 'menu-button')
  })
})

describe('MenuList', () => {
  test('should be named properly', () => {
    expect(MenuList).toHaveBeenNamed('MenuList')
  })

  test('should render as `div` by default', () => {
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

    expect(getMenuList(MenuState.Closed)).toBeInstanceOf(HTMLDivElement)
  })

  test('should render default slot content', () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          ...
        </MenuList>
      </Menu>
    `)

    expect(getMenuList(MenuState.Closed)).toHaveTextContent('...')
  })

  test('can be rendered as any html element', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList as='ul'>
          <MenuItem as='a'>Settings</MenuItem>
          <MenuItem as='a'>Profile</MenuItem>
          <MenuItem as='a'>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()
    expect(getMenuList(MenuState.Closed)).toBeInstanceOf(HTMLUListElement)
  })

  test('can be rendered as any custom component', async () => {
    const CustomComponent = defineComponent({
      template: `
        <ul class='bg-white'>
          <slot></slot>
        </ul>`,
    })

    render({
      template: `
        <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList :as='CustomComponent'>
          <MenuItem as='a'>Settings</MenuItem>
          <MenuItem as='a'>Profile</MenuItem>
          <MenuItem as='a'>Sign out</MenuItem>
        </MenuList>
        </Menu>
      `,
      setup: () => ({ CustomComponent }),
    })

    await nextTick()
    assertMenuIsFullyAccessible()
    expect(getMenuList(MenuState.Closed)).toBeInstanceOf(HTMLUListElement)
    expect(getMenuList(MenuState.Closed)).toHaveClass('bg-white')
    expect(getMenuList(MenuState.Closed)).toHaveTextContent(
      ['Settings', 'Profile', 'Sign out'].join(''),
    )
  })

  test('forwards attrs to the rendered element', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList class='bg-white' dir='rtl' data-test-id='test-id'>
          <MenuItem as='a'>Settings</MenuItem>
          <MenuItem as='a'>Profile</MenuItem>
          <MenuItem as='a'>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()
    expect(getMenuList(MenuState.Closed)).toHaveClass('bg-white')
    expect(getMenuList(MenuState.Closed)).toHaveAttribute('dir', 'rtl')
    expect(getMenuList(MenuState.Closed)).toHaveAttribute(
      'data-test-id',
      'test-id',
    )
  })

  test('should be possible to render as fragment and pass its props to child node', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList as='fragment'>
          <ul>
            <MenuItem as='a'>Settings</MenuItem>
            <MenuItem as='a'>Profile</MenuItem>
            <MenuItem as='a'>Sign out</MenuItem>
          </ul>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()
    expect(getMenuList(MenuState.Closed)).toBeInstanceOf(HTMLUListElement)
    expect(getMenuList(MenuState.Closed)).toHaveTextContent(
      ['Settings', 'Profile', 'Sign out'].join(''),
    )
  })

  test('should not be possible to override controlled props', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList role='alert' aria-activedescendant='fake-id'>
          <MenuItem as='a'>Settings</MenuItem>
          <MenuItem as='a'>Profile</MenuItem>
          <MenuItem as='a'>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()
    expect(getMenuList(MenuState.Closed)).not.toHaveAttribute('role', 'alert')
    expect(getMenuList(MenuState.Closed)).not.toHaveAttribute(
      'aria-activedescendant',
      'fake-id',
    )
  })

  test('should be possible to override the id', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList id='menu-list'>
          <MenuItem as='a'>Settings</MenuItem>
          <MenuItem as='a'>Profile</MenuItem>
          <MenuItem as='a'>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()
    expect(getMenuList(MenuState.Closed)).toHaveAttribute('id', 'menu-list')
  })
})

describe('MenuItem', () => {
  test('should be named properly', () => {
    expect(MenuItem).toHaveBeenNamed('MenuItem')
  })

  test(
    'should render as fragment by default (passing attrs will cause error)',
    suppressWarnings(() => {
      expect(() => {
        render(`
        <Menu>
          <MenuButton>Options</MenuButton>
          <MenuList>
            <MenuItem data-testid='menuitem'>Settings</MenuItem>
          </MenuList>
        </Menu>
      `)
      }).toThrowError(
        /Unable to pass props to fragment(.+?)<MenuItem \/> component/s,
      )
    }),
  )

  test('should render default slot content', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem as='a'>Settings</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()
    expect(getMenuItems(MenuState.Closed)[0]).toHaveTextContent('Settings')
  })

  test('can be rendered as any html element', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList as='ul'>
          <MenuItem as='li'>Settings</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()
    expect(getMenuItems(MenuState.Closed)[0]).toBeInstanceOf(HTMLLIElement)
  })

  test('can be rendered as any custom component', async () => {
    const CustomComponent = defineComponent({
      template: `
        <li class='text-blue'>
          <slot></slot>
        </li>`,
    })

    render({
      template: `
        <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList as='ul'>
          <MenuItem :as='CustomComponent'>Settings</MenuItem>
        </MenuList>
        </Menu>
      `,
      setup: () => ({ CustomComponent }),
    })

    await nextTick()
    assertMenuIsFullyAccessible()
    expect(getMenuItems(MenuState.Closed)[0]).toBeInstanceOf(HTMLLIElement)
    expect(getMenuItems(MenuState.Closed)[0]).toHaveClass('text-blue')
    expect(getMenuItems(MenuState.Closed)[0]).toHaveTextContent('Settings')
    expect(getMenuItems(MenuState.Closed)[0]).toHaveAttribute(
      'role',
      'menuitem',
    )
  })

  test('forwards attrs to the rendered element', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem as='a' class='bg-white' dir='rtl' data-test-id='test-id'>
            Settings
          </MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()
    expect(getMenuItems(MenuState.Closed)[0]).toHaveClass('bg-white')
    expect(getMenuItems(MenuState.Closed)[0]).toHaveAttribute('dir', 'rtl')
    expect(getMenuItems(MenuState.Closed)[0]).toHaveAttribute(
      'data-test-id',
      'test-id',
    )
  })

  test('should be possible to render as fragment and pass its props to its child node', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem>
            <a href='/settings'>Settings</a>
          </MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()
    expect(getMenuItems(MenuState.Closed)[0]).toBeInstanceOf(HTMLAnchorElement)
  })

  test('should not be possible to override controlled props', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList role='alert' aria-disabled>
          <MenuItem as='a'>Settings</MenuItem>
          <MenuItem as='a'>Profile</MenuItem>
          <MenuItem as='a'>Sign out</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()
    expect(getMenuItems(MenuState.Closed)[0]).not.toHaveAttribute(
      'role',
      'alert',
    )
    expect(getMenuItems(MenuState.Closed)[0]).not.toHaveAttribute(
      'aria-disabled',
      'true',
    )
  })

  test('should be possible to override the id', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem as='a' id='menu-item'>Settings</MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()
    expect(getMenuItems(MenuState.Closed)[0]).toHaveAttribute('id', 'menu-item')
  })

  test('should expose its active state through default slot', async () => {
    render(`
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuList>
          <MenuItem v-slot='{ isActive }'>
            <button :class="{ 'bg-blue': isActive }">Settings</button>
          </MenuItem>
          <MenuItem v-slot='{ isActive }'>
            <button :class="{ 'bg-blue': isActive }">Profile</button>
          </MenuItem>
        </MenuList>
      </Menu>
    `)

    await nextTick()
    assertMenuIsFullyAccessible()
    assertMenuIsClosed()

    await press(Keyboard.Space, getMenuButton())
    assertMenuIsOpen()
    assertActiveMenuItemIs(0)
    expect(getMenuItems(MenuState.Open)[0]).toHaveClass('bg-blue')
    expect(getMenuItems(MenuState.Open)[1]).not.toHaveClass('bg-blue')

    await press(Keyboard.ArrowDown)
    assertActiveMenuItemIs(1)
    expect(getMenuItems(MenuState.Open)[0]).not.toHaveClass('bg-blue')
    expect(getMenuItems(MenuState.Open)[1]).toHaveClass('bg-blue')
  })
})
