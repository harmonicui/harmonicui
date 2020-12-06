import { processThemes } from '../processThemes'

jest.mock('../../utils/tailwindUtils')

test('generate components of all given themes', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const themes = require('../../__fixtures__/themes/DaVinci.theme')

  expect(processThemes(themes))
    .toEqual({
      '.mona-lisa': {
        backgroundColor: '#6366f1',
        paddingTop: '1rem',
        width: '33.333333%',
      },
      '.last-supper': {
        backgroundColor: '#937433',
        paddingRight: '2rem',
        height: '40%',
      },
      '.lady-with-an-ermine': {
        backgroundColor: '#937433',
        paddingRight: '2rem',
        paddingLeft: '1.5rem',
        color: '#1f2937',
      },
      '.lady-with-an-ermine--awesome': {
        backgroundColor: '#f472b6',
        color: '#064e3b',
      },
    })
})
