import buildComponent from './buildComponent'

jest.mock('./tailwindUtils')

test('build a component from given styles', () => {
  const styles = {
    backgroundColor: 'blue-500',
    paddingTop: '4',
    paddingRight: '20px',
  }

  expect(buildComponent('.my-component', styles)).toEqual({
    '.my-component': {
      backgroundColor: '#3b82f6',
      paddingTop: '1rem',
      paddingRight: '20px',
    },
  })
})
