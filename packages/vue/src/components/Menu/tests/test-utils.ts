import { screen } from '@testing-library/vue'
import {
  assertMenuButtonDoesNotHaveAriaExpandedAttribute,
  assertMenuButtonHasAriaExpandedAttribute,
  assertMenuButtonHasProperAriaControlsAttribute,
  assertMenuButtonHasProperAriaHasPopupAttribute,
  assertMenuButtonHasProperRole,
  assertMenuItemHasProperAriaDisabledAttribute,
  assertMenuItemHasProperRole,
  assertMenuItemHasProperTabindex,
  assertMenuListDoesNotHaveAriaActiveDescendantAttribute,
  assertMenuListHasProperAriaActiveDescendantAttribute,
  assertMenuListHasProperAriaLabelledByAttribute,
  assertMenuListHasProperRole,
  assertMenuListHasProperTabindex,
  assertMenuListIsFocused,
  assertMenuListIsNotFocused,
  assertMenuListIsNotVisible,
  assertMenuListIsVisible,
} from './assertions'
import { Menu, MenuState } from '../Menu'
import { MenuItem } from '../MenuItem'
import { MenuList } from '../MenuList'
import { MenuButton } from '../MenuButton'
import { createRenderer } from '../../../test-utils'

export function getMenuButton(): HTMLElement {
  return screen.getByRole('button')
}

export function getMenuList(state: MenuState): HTMLElement {
  return screen.getByRole('menu', {
    hidden: state === MenuState.Closed,
  })
}

export function getMenuItems(
  state: MenuState = MenuState.Open,
): Array<HTMLElement> {
  return screen.getAllByRole('menuitem', {
    hidden: state === MenuState.Closed,
  })
}

export const render = createRenderer({
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
})

interface Options {
  disabledItems?: Array<number>
  state?: MenuState
  menuButton?: HTMLElement
  menuList?: HTMLElement
}

export function assertMenuIsFullyAccessible({
  disabledItems = [],
  state = MenuState.Closed,
  menuButton = getMenuButton(),
  menuList = getMenuList(state),
}: Options = {}): void {
  assertMenuButtonHasProperRole(menuButton)
  assertMenuButtonHasProperAriaHasPopupAttribute(menuButton)
  assertMenuButtonHasProperAriaControlsAttribute(menuButton, menuList.id)

  assertMenuListHasProperRole(menuList)
  assertMenuListHasProperTabindex(menuList)
  assertMenuListHasProperAriaLabelledByAttribute(menuList, menuButton.id)

  assertAllMenuItemsHaveProperRole(state)
  assertAllMenuItemsHaveProperTabindex(disabledItems, state)

  assertAllMenuItemsHaveProperAriaDisabledAttribute(disabledItems, state)
}

export function assertMenuButtonIsFocused(): void {
  return expect(getMenuButton()).toHaveFocus()
}

export function assertMenuButtonIsNotFocused(): void {
  return expect(getMenuButton()).not.toHaveFocus()
}

export function assertMenuIsOpen({
  menuButton = getMenuButton(),
  menuList = getMenuList(MenuState.Open),
}: Pick<Options, 'menuButton' | 'menuList'> = {}): void {
  assertMenuButtonHasAriaExpandedAttribute(menuButton)
  assertMenuListIsVisible(menuList)
  assertMenuListIsFocused(menuList)
}

export function assertMenuIsClosed({
  menuButton = getMenuButton(),
  menuList = getMenuList(MenuState.Closed),
}: Pick<Options, 'menuButton' | 'menuList'> = {}): void {
  assertMenuButtonDoesNotHaveAriaExpandedAttribute(menuButton)
  assertMenuListDoesNotHaveAriaActiveDescendantAttribute(menuList)
  assertMenuListIsNotVisible(menuList)
  assertMenuListIsNotFocused(menuList)
}

export function assertActiveMenuItemIs(index: number): void {
  const activeItem = getMenuItems()[index]
  assertMenuListHasProperAriaActiveDescendantAttribute(
    getMenuList(MenuState.Open),
    activeItem.id,
  )
  assertMenuItemHasActiveDataState(activeItem)

  getMenuItems()
    .filter((_, i) => i !== index)
    .forEach(menuItem => {
      assertMenuItemDoesNotHaveActiveDataState(menuItem)
    })
}

export function assertNoActiveMenuItem(): void {
  assertMenuListDoesNotHaveAriaActiveDescendantAttribute(
    getMenuList(MenuState.Open),
  )

  if (screen.queryAllByRole('menuitem').length !== 0) {
    getMenuItems(MenuState.Open).forEach(menuItem => {
      assertMenuItemDoesNotHaveActiveDataState(menuItem)
    })
  }
}

function assertAllMenuItemsHaveProperTabindex(
  disabledItems: Options['disabledItems'],
  state: MenuState,
): void {
  getMenuItems(state).forEach((element, index) => {
    assertMenuItemHasProperTabindex(element, !!disabledItems?.includes(index))
  })
}

function assertAllMenuItemsHaveProperRole(state: MenuState): void {
  getMenuItems(state).forEach(element => assertMenuItemHasProperRole(element))
}

function assertAllMenuItemsHaveProperAriaDisabledAttribute(
  disabledItems: Options['disabledItems'],
  state: MenuState,
): void {
  getMenuItems(state).forEach((menuItem, index) => {
    if (disabledItems?.includes(index)) {
      assertMenuItemHasProperAriaDisabledAttribute(menuItem, true)
      assertMenuItemHasDisabledDataState(menuItem)
    } else {
      assertMenuItemHasProperAriaDisabledAttribute(menuItem, false)
      assertMenuItemDoesNotHaveDisabledDataState(menuItem)
    }
  })
}

function assertMenuItemHasActiveDataState(element: Element): void {
  expect(element).toHaveAttribute(
    'data-state',
    expect.stringContaining('active'),
  )
}

function assertMenuItemDoesNotHaveActiveDataState(element: Element): void {
  expect(element).not.toHaveAttribute(
    'data-state',
    expect.stringContaining('active'),
  )
}

function assertMenuItemHasDisabledDataState(element: Element): void {
  expect(element).toHaveAttribute(
    'data-state',
    expect.stringContaining('disabled'),
  )
}

function assertMenuItemDoesNotHaveDisabledDataState(element: Element): void {
  expect(element).not.toHaveAttribute(
    'data-state',
    expect.stringContaining('disabled'),
  )
}
