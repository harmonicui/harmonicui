import userEvent from '@testing-library/user-event'
import { nextTick } from 'vue'

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
