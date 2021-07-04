import {
  MenuItemContext,
  MenuItemContextKey,
  provideMenuItemContext,
  useMenuItemContext,
} from './MenuItemContext'

test('creates a context for MenuItemContract', () => {
  expect(MenuItemContext).toHaveProperty('provide')
  expect(MenuItemContext).toHaveProperty('consume')
})

test('exposes the context key', () => {
  expect(typeof MenuItemContext.key).toEqual('symbol')
})

test('exports alias utilities for using MenuItemContext', () => {
  expect(provideMenuItemContext).toEqual(MenuItemContext.provide)
  expect(useMenuItemContext).toEqual(MenuItemContext.consume)
  expect(MenuItemContextKey).toEqual(MenuItemContext.key)
})
