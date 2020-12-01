import buildThemeComponents from '../buildThemeComponents'

jest.mock('../tailwindUtils')

test('constructs a component for theme\'s styles', () => {
  const theme = {
    className: 'my-theme',

    styles: {
      backgroundColor: 'blue-500',
      paddingRight: '1rem',
      paddingLeft: '4',
    },
  }

  expect(buildThemeComponents(theme)).toEqual({
    '.my-theme': {
      backgroundColor: '#3b82f6',
      paddingRight: '1rem',
      paddingLeft: '1rem',
    },
  })
})

test('constructs a component for each modifier', () => {
  const theme = {
    className: 'another-theme',

    styles: {
      backgroundColor: 'blue-500',
    },

    modifiers: {
      success: {
        backgroundColor: 'green-500',
        paddingLeft: '8',
      },

      error: {
        backgroundColor: 'red-600',
        paddingRight: '6',
      },
    },
  }

  expect(buildThemeComponents(theme)).toEqual({
    '.another-theme': {
      backgroundColor: '#3b82f6',
    },

    '.another-theme--success': {
      backgroundColor: '#10b981',
      paddingLeft: '2rem',
    },

    '.another-theme--error': {
      backgroundColor: '#dc2626',
      paddingRight: '1.5rem',
    },
  })
})

test('a theme can contain no components', () => {
  const theme = {
    className: '.empty-theme',
  }

  expect(buildThemeComponents(theme)).toEqual({})
})

test('theme may contain empty styles or modifiers', () => {
  const theme = {
    className: '.empty-objects',
    styles: {},
    modifiers: {},
  }

  expect(buildThemeComponents(theme)).toEqual({
    '.empty-objects': {},
  })
})
