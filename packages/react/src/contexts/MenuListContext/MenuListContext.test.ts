import {
  MenuListContext,
  MenuListContextProvider,
  useMenuListContext,
} from './MenuListContext'

test('creates a context for MenuListContract', () => {
  expect(MenuListContext).toHaveProperty('Provider')
  expect(MenuListContext).toHaveProperty('consume')
})

test('exports alias utilities for using MenuListContext', () => {
  expect(MenuListContextProvider).toEqual(MenuListContext.Provider)
  expect(useMenuListContext).toEqual(MenuListContext.consume)
})
