import collectThemes from '../collectThemes'

test('generates a collection item for each theme', () => {
  const themes = {
    MonoLisa: {
      className: 'mona lisa',
    },
    LastSupper: {
      className: 'Last Supper',
    },
  }

  expect(collectThemes(themes))
    .toEqual({
      MonoLisa: {
        className: '.mona-lisa',
      },
      LastSupper: {
        className: '.last-supper',
      },
    })
})

test('add modifiers to collection item', () => {
  const themes = {
    MonoLisa: {
      className: 'mona lisa',
    },
    LastSupper: {
      className: 'Last Supper',
      modifiers: {
        success: {},
        error: {},
      },
    },
  }

  expect(collectThemes(themes))
    .toEqual({
      MonoLisa: {
        className: '.mona-lisa',
      },
      LastSupper: {
        className: '.last-supper',
        modifiers: {
          success: '.last-supper--success',
          error: '.last-supper--error',
        },
      },
    })
})
