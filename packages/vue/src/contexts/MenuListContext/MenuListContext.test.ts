import {
  MenuListContext,
  MenuListContextKey,
  provideMenuListContext,
  useMenuListContext,
} from './MenuListContext'

test('creates a context for MenuItemsContract', () => {
  expect(MenuListContext).toHaveProperty('provide')
  expect(MenuListContext).toHaveProperty('consume')
})

test('exposes the context key', () => {
  expect(typeof MenuListContext.key).toEqual('symbol')
})

test('exports alias utilities for using MenuItemsContext', () => {
  expect(provideMenuListContext).toEqual(MenuListContext.provide)
  expect(useMenuListContext).toEqual(MenuListContext.consume)
  expect(MenuListContextKey).toEqual(MenuListContext.key)
})
