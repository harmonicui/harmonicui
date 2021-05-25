import {
  LabelContext,
  LabelContextKey,
  provideLabelContext,
  useLabelContext,
} from './LabelContext'

test('creates a context for LabelContract', () => {
  expect(LabelContext).toHaveProperty('provide')
  expect(LabelContext).toHaveProperty('consume')
})

test('exposes the context key', () => {
  expect(typeof LabelContext.key).toEqual('symbol')
})

test('exports alias utilities for using LabelContext', () => {
  expect(provideLabelContext).toEqual(LabelContext.provide)
  expect(useLabelContext).toEqual(LabelContext.consume)
  expect(LabelContextKey).toEqual(LabelContext.key)
})
