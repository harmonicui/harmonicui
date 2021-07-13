import React, { FunctionComponent } from 'react'
import { Menu } from '../Menu'
import { logDOM, render } from '@testing-library/react'
import { UnableToPassPropsThroughFragmentError } from '../../../utils'
import { Keyboard, press, suppressConsoleErrors } from '../../../test-utils'
import {
  assertActiveMenuItemIs,
  assertMenuIsClosed,
  assertMenuIsFullyAccessible,
  assertMenuIsOpen,
  getMenu,
  getMenuButton,
  getMenuItems,
  getMenuList,
} from './test-utils'

describe('Menu', () => {
  test('should be named properly', () => {
    expect(Menu).toHaveBeenNamed('Menu')
  })

  test(
    'should render as fragment by default (passing attrs will cause error)',
    suppressConsoleErrors(() => {
      expect(() => {
        render(
          <Menu data-testid="menu">
            <Menu.Button>Options</Menu.Button>
            <Menu.List>
              <Menu.Item as="a">Settings</Menu.Item>
              <Menu.Item as="a">Profile</Menu.Item>
              <Menu.Item as="a">Sign out</Menu.Item>
            </Menu.List>
          </Menu>,
        )
        logDOM()
      }).toThrowError(new UnableToPassPropsThroughFragmentError('Menu'))
    }),
  )

  test('can be rendered as any html element', async () => {
    render(
      <Menu as="div" data-testid="menu">
        <Menu.Button>Options</Menu.Button>
        <Menu.List>
          <Menu.Item as="a">Settings</Menu.Item>
          <Menu.Item as="a">Profile</Menu.Item>
          <Menu.Item as="a">Sign out</Menu.Item>
        </Menu.List>
      </Menu>,
    )

    expect(getMenu()).toBeInstanceOf(HTMLDivElement)
  })

  test('should render default children contents', () => {
    render(
      <Menu as="div" data-testid="menu">
        <Menu.Button>Options</Menu.Button>
        <Menu.List>
          <Menu.Item as="a">Settings</Menu.Item>
          <Menu.Item as="a">Profile</Menu.Item>
          <Menu.Item as="a">Sign out</Menu.Item>
        </Menu.List>
      </Menu>,
    )

    expect(getMenu()).toHaveTextContent(
      ['Options', 'Settings', 'Profile', 'Sign out'].join(''),
    )
  })

  test('can be rendered as any custom component', async () => {
    const CustomComponent: FunctionComponent = ({
      children,
      ...otherProps
    }) => {
      return (
        <div className="align-center" {...otherProps}>
          {children}
        </div>
      )
    }

    render(
      <Menu as={CustomComponent} data-testid="menu">
        <Menu.Button>Options</Menu.Button>
        <Menu.List>
          <Menu.Item as="a">Settings</Menu.Item>
          <Menu.Item as="a">Profile</Menu.Item>
          <Menu.Item as="a">Sign out</Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible()
    expect(getMenu()).toBeInstanceOf(HTMLDivElement)
    expect(getMenu()).toHaveClass('align-center')
    expect(getMenu()).toHaveTextContent(
      ['Options', 'Settings', 'Profile', 'Sign out'].join(''),
    )
  })

  test('forwards attrs to the rendered element', async () => {
    render(
      <Menu as="div" className="margin-x-auto" data-testid="menu" id="menu">
        <Menu.Button>Options</Menu.Button>
        <Menu.List>
          <Menu.Item as="a">Settings</Menu.Item>
          <Menu.Item as="a">Profile</Menu.Item>
          <Menu.Item as="a">Sign out</Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible()
    expect(getMenu()).toBeInstanceOf(HTMLDivElement)
    expect(getMenu()).toHaveClass('margin-x-auto')
    expect(getMenu()).toHaveAttribute('id', 'menu')
  })

  test('should be possible render as fragment and pass its attrs to child node', async () => {
    render(
      <Menu id="menu" data-testid="menu">
        <div className="margin-x-auto">
          <Menu.Button>Options</Menu.Button>
          <Menu.List>
            <Menu.Item as="a">Settings</Menu.Item>
            <Menu.Item as="a">Profile</Menu.Item>
            <Menu.Item as="a">Sign out</Menu.Item>
          </Menu.List>
        </div>
      </Menu>,
    )

    assertMenuIsFullyAccessible()
    expect(getMenu()).toBeInstanceOf(HTMLDivElement)
    expect(getMenu()).toHaveClass('margin-x-auto')
    expect(getMenu()).toHaveAttribute('id', 'menu')
  })

  test('should expose MenuState through its render props', async () => {
    render(
      <Menu>
        {({ isOpen }) => (
          <>
            <Menu.Button className={`${isOpen ? 'border-blue' : ''}`}>
              Options
            </Menu.Button>
            <Menu.List>
              <Menu.Item as="a">Settings</Menu.Item>
              <Menu.Item as="a">Profile</Menu.Item>
              <Menu.Item as="a">Sign out</Menu.Item>
            </Menu.List>
          </>
        )}
      </Menu>,
    )

    assertMenuIsClosed()
    expect(getMenuButton()).not.toHaveClass('border-blue')

    await press(Keyboard.Space, getMenuButton())
    assertMenuIsOpen()
    expect(getMenuButton()).toHaveClass('border-blue')
  })
})

describe('MenuButton', () => {
  test('should be named properly', () => {
    expect(Menu.Button).toHaveBeenNamed('MenuButton')
  })

  test('should render as `button` by default', () => {
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

    expect(getMenuButton()).toBeInstanceOf(HTMLButtonElement)
  })

  test('should render children contents', () => {
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

    expect(getMenuButton()).toHaveTextContent('Options')
  })

  test('can be rendered as any html element', async () => {
    render(
      <Menu>
        <Menu.Button as="a">Options</Menu.Button>
        <Menu.List>
          <Menu.Item as="a">Settings</Menu.Item>
          <Menu.Item as="a">Profile</Menu.Item>
          <Menu.Item as="a">Sign out</Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible()
    expect(getMenuButton()).toBeInstanceOf(HTMLAnchorElement)
  })

  test('can be rendered as any custom component', async () => {
    const CustomComponent: FunctionComponent = ({
      children,
      ...otherProps
    }) => {
      return (
        <span className="color-red" {...otherProps}>
          {children}
        </span>
      )
    }

    render(
      <Menu>
        <Menu.Button as={CustomComponent}>Options</Menu.Button>
        <Menu.List>
          <Menu.Item as="a">Settings</Menu.Item>
          <Menu.Item as="a">Profile</Menu.Item>
          <Menu.Item as="a">Sign out</Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible()
    expect(getMenuButton()).toBeInstanceOf(HTMLSpanElement)
    expect(getMenuButton()).toHaveClass('color-red')
    expect(getMenuButton()).toHaveTextContent('Options')
  })

  test('forwards attrs to the rendered element', async () => {
    render(
      <Menu>
        <Menu.Button className="bg-green" dir="rtl" data-test-id="test-id">
          Options
        </Menu.Button>
        <Menu.List>
          <Menu.Item as="a">Settings</Menu.Item>
          <Menu.Item as="a">Profile</Menu.Item>
          <Menu.Item as="a">Sign out</Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible()
    expect(getMenuButton()).toHaveClass('bg-green')
    expect(getMenuButton()).toHaveAttribute('dir', 'rtl')
    expect(getMenuButton()).toHaveAttribute('data-test-id', 'test-id')
  })

  test('should be possible render as fragment and pass its props to child node', async () => {
    render(
      <Menu>
        <Menu.Button as="fragment">
          <button>Options</button>
        </Menu.Button>
        <Menu.List>
          <Menu.Item as="a">Settings</Menu.Item>
          <Menu.Item as="a">Profile</Menu.Item>
          <Menu.Item as="a">Sign out</Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible()
    expect(getMenuButton()).toBeInstanceOf(HTMLButtonElement)
    expect(getMenuButton()).toHaveTextContent('Options')
  })

  test('should not be possible to override controlled props', async () => {
    render(
      <Menu>
        <Menu.Button role="alert" aria-expanded="true" aria-controls="fake-id">
          Options
        </Menu.Button>
        <Menu.List>
          <Menu.Item as="a">Settings</Menu.Item>
          <Menu.Item as="a">Profile</Menu.Item>
          <Menu.Item as="a">Sign out</Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible()
    expect(getMenuButton()).not.toHaveAttribute('role', 'alert')
    expect(getMenuButton()).not.toHaveAttribute('aria-expanded', 'true')
    expect(getMenuButton()).not.toHaveAttribute('aria-controls', 'fake-id')
  })

  test('should be possible to override the id', async () => {
    render(
      <Menu>
        <Menu.Button id="menu-button">Options</Menu.Button>
        <Menu.List>
          <Menu.Item as="a">Settings</Menu.Item>
          <Menu.Item as="a">Profile</Menu.Item>
          <Menu.Item as="a">Sign out</Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible()
    expect(getMenuButton()).toHaveAttribute('id', 'menu-button')
  })
})

describe('MenuList', () => {
  test('should be named properly', () => {
    expect(Menu.List).toHaveBeenNamed('MenuList')
  })

  test('should render as `div` by default', () => {
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

    expect(getMenuList({ hidden: true })).toBeInstanceOf(HTMLDivElement)
  })

  test('should render children content', () => {
    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List>...</Menu.List>
      </Menu>,
    )

    expect(getMenuList({ hidden: true })).toHaveTextContent('...')
  })

  test('can be rendered as any html element', async () => {
    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List as="ul">
          <Menu.Item as="a">Settings</Menu.Item>
          <Menu.Item as="a">Profile</Menu.Item>
          <Menu.Item as="a">Sign out</Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible()
    expect(getMenuList({ hidden: true })).toBeInstanceOf(HTMLUListElement)
  })

  test('can be rendered as any custom component', async () => {
    const CustomComponent: FunctionComponent = ({
      children,
      ...otherProps
    }) => {
      return (
        <ul className="bg-white" {...otherProps}>
          {children}
        </ul>
      )
    }

    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List as={CustomComponent}>
          <Menu.Item as="a">Settings</Menu.Item>
          <Menu.Item as="a">Profile</Menu.Item>
          <Menu.Item as="a">Sign out</Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible()
    expect(getMenuList({ hidden: true })).toBeInstanceOf(HTMLUListElement)
    expect(getMenuList({ hidden: true })).toHaveClass('bg-white')
    expect(getMenuList({ hidden: true })).toHaveTextContent(
      ['Settings', 'Profile', 'Sign out'].join(''),
    )
  })

  test('forwards attrs to the rendered element', async () => {
    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List className="bg-white" dir="rtl" data-test-id="test-id">
          <Menu.Item as="a">Settings</Menu.Item>
          <Menu.Item as="a">Profile</Menu.Item>
          <Menu.Item as="a">Sign out</Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible()
    expect(getMenuList({ hidden: true })).toHaveClass('bg-white')
    expect(getMenuList({ hidden: true })).toHaveAttribute('dir', 'rtl')
    expect(getMenuList({ hidden: true })).toHaveAttribute(
      'data-test-id',
      'test-id',
    )
  })

  test('should be possible to render as fragment and pass its props to child node', async () => {
    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List as="fragment">
          <ul>
            <Menu.Item as="a">Settings</Menu.Item>
            <Menu.Item as="a">Profile</Menu.Item>
            <Menu.Item as="a">Sign out</Menu.Item>
          </ul>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible()
    expect(getMenuList({ hidden: true })).toBeInstanceOf(HTMLUListElement)
    expect(getMenuList({ hidden: true })).toHaveTextContent(
      ['Settings', 'Profile', 'Sign out'].join(''),
    )
  })

  test('should not be possible to override controlled props', async () => {
    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List role="alert" aria-activedescendant="fake-id">
          <Menu.Item as="a">Settings</Menu.Item>
          <Menu.Item as="a">Profile</Menu.Item>
          <Menu.Item as="a">Sign out</Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible()
    expect(getMenuList({ hidden: true })).not.toHaveAttribute('role', 'alert')
    expect(getMenuList({ hidden: true })).not.toHaveAttribute(
      'aria-activedescendant',
      'fake-id',
    )
  })

  test('should be possible to override the id', async () => {
    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List id="menu-list">
          <Menu.Item as="a">Settings</Menu.Item>
          <Menu.Item as="a">Profile</Menu.Item>
          <Menu.Item as="a">Sign out</Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible()
    expect(getMenuList({ hidden: true })).toHaveAttribute('id', 'menu-list')
  })
})

describe('MenuItem', () => {
  test('should be named properly', () => {
    expect(Menu.Item).toHaveBeenNamed('MenuItem')
  })

  test(
    'should render as fragment by default (passing attrs will cause error)',
    suppressConsoleErrors(() => {
      expect(() => {
        render(
          <Menu>
            <Menu.Button>Options</Menu.Button>
            <Menu.List>
              <Menu.Item data-testid="menuitem">Settings</Menu.Item>
            </Menu.List>
          </Menu>,
        )
      }).toThrowError(new UnableToPassPropsThroughFragmentError('MenuItem'))
    }),
  )

  test('should render default slot content', async () => {
    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List>
          <Menu.Item as="a">Settings</Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible()
    expect(getMenuItems({ hidden: true })[0]).toHaveTextContent('Settings')
  })

  test('can be rendered as any html element', async () => {
    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List as="ul">
          <Menu.Item as="li">Settings</Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible()
    expect(getMenuItems({ hidden: true })[0]).toBeInstanceOf(HTMLLIElement)
  })

  test('can be rendered as any custom component', async () => {
    const CustomComponent: FunctionComponent = ({
      children,
      ...otherProps
    }) => {
      return (
        <li className="text-blue" {...otherProps}>
          {children}
        </li>
      )
    }

    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List as="ul">
          <Menu.Item as={CustomComponent}>Settings</Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible()
    expect(getMenuItems({ hidden: true })[0]).toBeInstanceOf(HTMLLIElement)
    expect(getMenuItems({ hidden: true })[0]).toHaveClass('text-blue')
    expect(getMenuItems({ hidden: true })[0]).toHaveTextContent('Settings')
    expect(getMenuItems({ hidden: true })[0]).toHaveAttribute(
      'role',
      'menuitem',
    )
  })

  test('forwards attrs to the rendered element', async () => {
    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List>
          <Menu.Item
            as="a"
            className="bg-white"
            dir="rtl"
            data-test-id="test-id"
          >
            Settings
          </Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible()
    expect(getMenuItems({ hidden: true })[0]).toHaveClass('bg-white')
    expect(getMenuItems({ hidden: true })[0]).toHaveAttribute('dir', 'rtl')
    expect(getMenuItems({ hidden: true })[0]).toHaveAttribute(
      'data-test-id',
      'test-id',
    )
  })

  test('should be possible to render as fragment and pass its props to its child node', async () => {
    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List>
          <Menu.Item>
            <a href="/settings">Settings</a>
          </Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible()
    expect(getMenuItems({ hidden: true })[0]).toBeInstanceOf(HTMLAnchorElement)
  })

  test('should not be possible to override controlled props', async () => {
    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List>
          <Menu.Item as="a" role="alert" aria-disabled>
            Settings
          </Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible()
    expect(getMenuItems({ hidden: true })[0]).toHaveAttribute(
      'role',
      'menuitem',
    )
    expect(getMenuItems({ hidden: true })[0]).not.toHaveAttribute(
      'aria-disabled',
      'true',
    )
  })

  test('should be possible to override the id', async () => {
    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List>
          <Menu.Item as="a" id="menu-item">
            Settings
          </Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible()
    expect(getMenuItems({ hidden: true })[0]).toHaveAttribute('id', 'menu-item')
  })

  test('should expose its active state through default slot', async () => {
    render(
      <Menu>
        <Menu.Button>Options</Menu.Button>
        <Menu.List>
          <Menu.Item>
            {({ isActive }) => (
              <button className={`${isActive ? 'bg-blue' : ''}`}>
                Settings
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ isActive }) => (
              <button className={`${isActive ? 'bg-blue' : ''}`}>
                Profile
              </button>
            )}
          </Menu.Item>
        </Menu.List>
      </Menu>,
    )

    assertMenuIsFullyAccessible()
    assertMenuIsClosed()

    await press(Keyboard.Space, getMenuButton())
    assertMenuIsOpen()
    assertActiveMenuItemIs(0)
    expect(getMenuItems()[0]).toHaveClass('bg-blue')
    expect(getMenuItems()[1]).not.toHaveClass('bg-blue')

    await press(Keyboard.ArrowDown)
    assertActiveMenuItemIs(1)
    expect(getMenuItems()[0]).not.toHaveClass('bg-blue')
    expect(getMenuItems()[1]).toHaveClass('bg-blue')
  })
})
