import { CheckBoxContext, provideCheckBoxContext, useCheckBoxContext } from '../CheckBoxContext'

test('creates a context for CheckBoxContract', () => {
  expect(CheckBoxContext).toHaveProperty('provide')
  expect(CheckBoxContext).toHaveProperty('consume')
})

test('exports alias utilities for using CheckBoxContext', () => {
  expect(provideCheckBoxContext).toEqual(CheckBoxContext.provide)
  expect(useCheckBoxContext).toEqual(CheckBoxContext.consume)
})
