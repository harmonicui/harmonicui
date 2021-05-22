import { useGenerateId } from './useGenerateId'

test('returns a unique number each time called', () => {
  expect(useGenerateId('Component')).toEqual('HUI-Component-1')
  expect(useGenerateId('AnotherComponent')).toEqual('HUI-AnotherComponent-2')
  expect(useGenerateId('TheLastComponent')).toEqual('HUI-TheLastComponent-3')
})
