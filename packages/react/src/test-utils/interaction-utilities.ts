import { act, fireEvent } from '@testing-library/react'
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

export const Keyboard: Record<string, Partial<KeyboardEvent>> = {
  Space: {
    key: ' ',
    keyCode: 32,
    charCode: 32,
  },
  Enter: {
    key: 'Enter',
    keyCode: 13,
    charCode: 13,
  },
  Escape: {
    key: 'Escape',
    keyCode: 27,
    charCode: 27,
  },
  Backspace: {
    key: 'Backspace',
    keyCode: 8,
  },
  ArrowLeft: {
    key: 'ArrowLeft',
    keyCode: 37,
  },
  ArrowUp: {
    key: 'ArrowUp',
    keyCode: 38,
  },
  ArrowRight: {
    key: 'ArrowRight',
    keyCode: 39,
  },
  ArrowDown: {
    key: 'ArrowDown',
    keyCode: 40,
  },
  Home: {
    key: 'Home',
    keyCode: 36,
  },
  End: {
    key: 'End',
    keyCode: 35,
  },
  PageUp: {
    key: 'PageUp',
    keyCode: 33,
  },
  PageDown: {
    key: 'PageDown',
    keyCode: 34,
  },
  Tab: {
    key: 'Tab',
    keyCode: 9,
    charCode: 9,
  },
}

export function type(text: string): void {
  jest.useFakeTimers()

  userEvent.keyboard(text)
  act(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })
}

export function press(
  key: Partial<KeyboardEvent>,
  element = document.activeElement,
): void {
  if (!element) {
    return expect(element).not.toBeNull()
  }

  fireEvent.keyDown(element, key)
}
