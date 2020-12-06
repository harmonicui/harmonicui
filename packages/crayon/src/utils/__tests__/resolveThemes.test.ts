import resolveThemes from '../resolveThemes'
import { cleanupTestPresets, setupTestPresets } from './testPresetUtils'

beforeAll(() => setupTestPresets())
afterAll(() => cleanupTestPresets())

test('should resolve all user themes from given directories', () => {
  const themes = resolveThemes({
    themes: ['src/__fixtures__/themes/**/*.theme.js'],
  })

  expect(Object.keys(themes)).toEqual([
    'MonaLisa',
    'LastSupper',
    'LadyWithAnErmine',
    'TheStormOnTheSeaOfGalilee',
    'TheNightWatch',
    'TheIncredulityOfThomas',
    'TheStarryNight',
    'CafeTerraceAtNight',
    'TheSower',
  ])
})

test('only resolves the files that matches given pattens', () => {
  const themes = resolveThemes({
    themes: ['src/__fixtures__/themes/**/*.theme.js'],
  })

  expect(Object.keys(themes))
    .toEqual(expect.not.arrayContaining([
      'TheGirlWithAPearlEarring',
      'ViewOnDelft',
    ]))
})

test('returns the loaded theme objects', () => {
  const themes = resolveThemes({
    themes: ['src/__fixtures__/themes/**/*.theme.js'],
  })

  expect(themes).toMatchObject({
    ...require('../../__fixtures__/themes/DaVinci.theme'),
    ...require('../../__fixtures__/themes/VanGogh.theme'),
    ...require('../../__fixtures__/themes/nested-directory/Rembrandt.theme'),
  })
})

test('can resolve from multiple patterns', () => {
  const themes = resolveThemes({
    themes: [
      'src/__fixtures__/themes/**/*.theme.js',
      'src/__fixtures__/themes/**/*.Vermeer.js',
    ],
  })

  expect(Object.keys(themes)).toEqual([
    'MonaLisa',
    'LastSupper',
    'LadyWithAnErmine',
    'TheStormOnTheSeaOfGalilee',
    'TheNightWatch',
    'TheIncredulityOfThomas',
    'TheStarryNight',
    'CafeTerraceAtNight',
    'TheSower',
    'TheGirlWithAPearlEarring',
    'ViewOnDelft',
  ])
})

test('resolves themes from presets by name', () => {
  const themes = resolveThemes({
    presets: '@harmonicui/test-preset-1',
  })

  expect(Object.keys(themes)).toEqual([
    'TheScream',
    'SpringLandscape',
    'TheSwing',
    'TheVisitToTheWetNurse',
  ])
  expect(themes).toMatchObject({
    ...require('@harmonicui/test-preset-1'),
  })
})

test('can resolve themes from a list of presets', () => {
  const themes = resolveThemes({
    presets: [
      '@harmonicui/test-preset-1',
      '@harmonicui/test-preset-2',
    ],
  })

  expect(Object.keys(themes))
    .toEqual([
      'TheScream',
      'SpringLandscape',
      'TheSwing',
      'TheVisitToTheWetNurse',
      'ImpressionSunrise',
      'WaterLilies',
      'TheLibertyLeadingThePeople',
      'TwoKnightsFightingInALandscape',
    ])

  expect(themes).toMatchObject({
    ...require('@harmonicui/test-preset-1'),
    ...require('@harmonicui/test-preset-2'),
  })
})

test('preset themes can be chosen', () => {
  const themes = resolveThemes({
    presets: [
      {
        name: '@harmonicui/test-preset-1',
        themes: [
          'TheScream',
          'TheSwing',
        ],
      },
      '@harmonicui/test-preset-2',
    ],
  })

  expect(Object.keys(themes))
    .toEqual([
      'TheScream',
      'TheSwing',
      'ImpressionSunrise',
      'WaterLilies',
      'TheLibertyLeadingThePeople',
      'TwoKnightsFightingInALandscape',
    ])

  expect(Object.keys(themes))
    .toEqual(expect.not.arrayContaining([
      'SpringLandscape',
      'TheVisitToTheWetNurse',
    ]))
})

test('throws an error if no theme resolved', () => {
  expect(() => {
    const themes = resolveThemes({})
    expect(Object.keys(themes)).toHaveLength(0)
  }).toThrowError('Error: No themes resolved. Please add some themes or presets to your configuration.')
})
