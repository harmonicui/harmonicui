export * from './createRenderer'
export * from './interaction-utilities'
export * from './render'
export * from './suppressWarnings'

export function getElement(query: string): Element {
  const element = container.querySelector(query)

  if (element === null) {
    throw new Error(`No element Found matching ${query}.`)
  }

  return element
}
