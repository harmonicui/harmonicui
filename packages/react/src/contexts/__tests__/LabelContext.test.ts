import { LabelContext, LabelContextProvider, useLabelContext } from '../LabelContext'

test('creates a context for LabelContract', () => {
  expect(LabelContext).toHaveProperty('Provider')
  expect(LabelContext).toHaveProperty('consume')
})

test('exports alias utilities for using LabelContext', () => {
  expect(LabelContextProvider).toEqual(LabelContext.Provider)
  expect(useLabelContext).toEqual(LabelContext.consume)
})
