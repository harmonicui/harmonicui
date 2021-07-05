import userEvent from '@testing-library/user-event'
import { nextTick } from 'vue'
import { fireEvent } from '@testing-library/vue'

interface ClickOptions {
  skipHover?: boolean
  clickCount?: number
}

export async function click(
  element: Element,
  init?: MouseEventInit,
  options?: ClickOptions,
): Promise<void> {
  userEvent.click(element, init, options)
  await nextTick()
}

export async function hover(
  element: Element,
  init?: MouseEventInit,
): Promise<void> {
  userEvent.hover(element, init)
  await nextTick()
}

export async function unHover(
  element: Element,
  init?: MouseEventInit,
): Promise<void> {
  userEvent.unhover(element, init)
  await nextTick()
}

export async function focus(element: HTMLElement): Promise<void> {
  element.focus()
  await nextTick()
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

export async function type(text: string): Promise<void> {
  jest.useFakeTimers()

  userEvent.keyboard(text)
  jest.runOnlyPendingTimers()
  await nextTick()
}

export async function press(
  key: Partial<KeyboardEvent>,
  element = document.activeElement,
): Promise<void> {
  if (!element) {
    return expect(element).not.toBeNull()
  }

  await fireEvent.keyDown(element, key)
}
