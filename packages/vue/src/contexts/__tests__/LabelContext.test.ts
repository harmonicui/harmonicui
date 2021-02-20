import { LabelContext, provideLabelContext, useLabelContext } from '../LabelContext'

test('creates a context for LabelContract', () => {
  expect(LabelContext).toHaveProperty('provide')
  expect(LabelContext).toHaveProperty('consume')
})

test('exports alias utilities for using LabelContext', () => {
  expect(provideLabelContext).toEqual(LabelContext.provide)
  expect(useLabelContext).toEqual(LabelContext.consume)
})
