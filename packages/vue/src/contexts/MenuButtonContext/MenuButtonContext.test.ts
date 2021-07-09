import {
  MenuButtonContext,
  MenuButtonContextKey,
  provideMenuButtonContext,
  useMenuButtonContext,
} from './MenuButtonContext'

test('creates a context for MenuButtonContract', () => {
  expect(MenuButtonContext).toHaveProperty('provide')
  expect(MenuButtonContext).toHaveProperty('consume')
})

test('exposes the context key', () => {
  expect(typeof MenuButtonContext.key).toEqual('symbol')
})

test('exports alias utilities for using MenuButtonContext', () => {
  expect(provideMenuButtonContext).toEqual(MenuButtonContext.provide)
  expect(useMenuButtonContext).toEqual(MenuButtonContext.consume)
  expect(MenuButtonContextKey).toEqual(MenuButtonContext.key)
})
