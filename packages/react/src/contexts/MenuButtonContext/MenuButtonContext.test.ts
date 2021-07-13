import {
  MenuButtonContext,
  MenuButtonContextProvider,
  useMenuButtonContext,
} from './MenuButtonContext'

test('creates a context for MenuButtonContract', () => {
  expect(MenuButtonContext).toHaveProperty('Provider')
  expect(MenuButtonContext).toHaveProperty('consume')
})

test('exports alias utilities for using MenuButtonContext', () => {
  expect(MenuButtonContextProvider).toEqual(MenuButtonContext.Provider)
  expect(useMenuButtonContext).toEqual(MenuButtonContext.consume)
})
