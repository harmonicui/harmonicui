export function assertMenuButtonHasProperRole(menuButton: HTMLElement): void {
  expect(menuButton).toHaveAttribute('role', 'button')
}

export function assertMenuButtonHasProperAriaHasPopupAttribute(
  menuButton: HTMLElement,
): void {
  expect(menuButton).toHaveAttribute('aria-haspopup', 'menu')
}

export function assertMenuButtonHasProperAriaControlsAttribute(
  menuButton: HTMLElement,
  menuId: string,
): void {
  expect(menuButton).toHaveAttribute('aria-controls', menuId)
}

export function assertMenuListHasProperRole(menuList: HTMLElement): void {
  expect(menuList).toHaveAttribute('role', 'menu')
}

export function assertMenuListHasProperTabindex(menuList: HTMLElement): void {
  expect(menuList).toHaveAttribute('tabindex', '-1')
}

export function assertMenuListHasProperAriaLabelledByAttribute(
  menuList: HTMLElement,
  menuButtonId: string,
): void {
  expect(menuList).toHaveAttribute('aria-labelledby', menuButtonId)
}

export function assertMenuItemHasProperTabindex(
  menuItem: HTMLElement,
  disabled: boolean,
): void {
  if (disabled) {
    return expect(menuItem).not.toHaveAttribute('tabindex')
  }

  expect(menuItem).toHaveAttribute('tabindex', '-1')
}

export function assertMenuItemHasProperRole(menuItem: HTMLElement): void {
  expect(menuItem).toHaveAttribute('role', 'menuitem')
}

export function assertMenuItemHasProperAriaDisabledAttribute(
  menuItem: HTMLElement,
  disabled: boolean,
): void {
  if (disabled) {
    expect(menuItem).toHaveAttribute('aria-disabled', 'true')
  } else {
    expect(menuItem).not.toHaveAttribute('aria-disabled')
  }
}

export function assertMenuButtonHasAriaExpandedAttribute(
  menuButton: HTMLElement,
): void {
  expect(menuButton).toHaveAttribute('aria-expanded', 'true')
}

export function assertMenuListIsVisible(menuList: HTMLElement): void {
  return expect(menuList).toBeVisible()
}

export function assertMenuListIsFocused(menuList: HTMLElement): void {
  return expect(menuList).toHaveFocus()
}

export function assertMenuButtonDoesNotHaveAriaExpandedAttribute(
  menuButton: HTMLElement,
): void {
  expect(menuButton).not.toHaveAttribute('aria-expanded')
}

export function assertMenuListDoesNotHaveAriaActiveDescendantAttribute(
  menuList: HTMLElement,
): void {
  expect(menuList).not.toHaveAttribute('aria-activedescendant')
}

export function assertMenuListIsNotVisible(menuList: HTMLElement): void {
  expect(menuList).not.toBeVisible()
}

export function assertMenuListIsNotFocused(menuList: HTMLElement): void {
  return expect(menuList).not.toHaveFocus()
}

export function assertMenuListHasProperAriaActiveDescendantAttribute(
  menuList: HTMLElement,
  activeDescendantId: string,
): void {
  expect(menuList).toHaveAttribute('aria-activedescendant', activeDescendantId)
}
