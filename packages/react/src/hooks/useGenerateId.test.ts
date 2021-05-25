import { renderHook } from '@testing-library/react-hooks'
import { useGenerateId } from './useGenerateId'

test('returns a unique number each time called', () => {
  const labelId = renderHook(() => useGenerateId('Label'))
  const inputId = renderHook(() => useGenerateId('Input'))

  expect(labelId.result.current).toEqual(expect.stringMatching(/^HUI-Label-/))
  expect(inputId.result.current).toEqual(expect.stringMatching(/^HUI-Input-/))
  expect(labelId).not.toEqual(inputId)
})
