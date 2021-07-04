import { fireEvent, RenderResult, screen } from '@testing-library/vue'
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
import { Keys, Menu, MenuState } from './Menu'
import { DefineComponent } from 'vue'
import { MenuItem } from './MenuItem'
import { MenuList } from './MenuList'
import { MenuButton } from './MenuButton'
import { renderInlineComponent } from '../../test-utils'

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

export function renderTemplate(
  ui: string | Partial<DefineComponent>,
): RenderResult {
  const components = {
    Menu,
    MenuItem,
    MenuList,
    MenuButton,
  }

  if (typeof ui === 'string') {
    return renderInlineComponent({
      template: ui,
      components,
    })
  }

  return renderInlineComponent({ components, ...ui })
}

export async function press(
  key: Keys,
  element = document.activeElement,
): Promise<void> {
  if (!element) {
    return expect(element).not.toBeNull()
  }

  await fireEvent.keyDown(element, { key })
}

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
  assertMenuListHasProperAriaActiveDescendantAttribute(
    getMenuList(MenuState.Open),
    getMenuItems()[index].id,
  )
}

export function assertNoActiveMenuItem(): void {
  assertMenuListDoesNotHaveAriaActiveDescendantAttribute(
    getMenuList(MenuState.Open),
  )
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
  getMenuItems(state).forEach((element, index) => {
    assertMenuItemHasProperAriaDisabledAttribute(
      element,
      !!disabledItems?.includes(index),
    )
  })
}
