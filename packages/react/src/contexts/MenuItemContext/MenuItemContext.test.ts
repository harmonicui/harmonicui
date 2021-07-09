import {
  MenuItemContext,
  MenuItemContextProvider,
  useMenuItemContext,
} from './MenuItemContext'

test('creates a context for MenuItemContract', () => {
  expect(MenuItemContext).toHaveProperty('Provider')
  expect(MenuItemContext).toHaveProperty('consume')
})

test('exports alias utilities for using MenuItemContext', () => {
  expect(MenuItemContextProvider).toEqual(MenuItemContext.Provider)
  expect(useMenuItemContext).toEqual(MenuItemContext.consume)
})
