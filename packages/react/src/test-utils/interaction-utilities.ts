import userEvent from '@testing-library/user-event'

interface ClickOptions {
  skipHover?: boolean
  clickCount?: number
}

export function click(
  element: Element,
  init?: MouseEventInit,
  options?: ClickOptions,
): void {
  userEvent.click(element, init, options)
}

export function hover(element: Element, init?: MouseEventInit): void {
  userEvent.hover(element, init)
}

export function unHover(element: Element, init?: MouseEventInit): void {
  userEvent.unhover(element, init)
}

export function focus(element: HTMLElement): void {
  element.focus()
}
