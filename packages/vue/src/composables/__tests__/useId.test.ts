import useId from '../useId'

test('returns a unique number each time called', () => {
  expect(useId()).toEqual(1)
  expect(useId()).toEqual(2)
  expect(useId()).toEqual(3)
})
