import collector from '../collector'

test('resolves and collect all themes from config', () => {
  const themeCollection = collector({
    themes: ['src/__fixtures__/themes/**/*.theme.js'],
  })

  expect(themeCollection)
    .toEqual(
      {
        MonaLisa: {
          className: '.mona-lisa',
        },
        LastSupper: {
          className: '.last-supper',
        },
        LadyWithAnErmine: {
          className: '.lady-with-an-ermine',
          modifiers: {
            awesome: '.lady-with-an-ermine--awesome',
          },
        },
        TheStarryNight: {
          className: '.the-starry-night',
        },
        CafeTerraceAtNight: {
          className: '.cafe-terrace-at-night',
        },
        TheSower: {
          className: '.the-sower',
        },
        TheIncredulityOfThomas: {
          className: '.the-incredulity-of-thomas',
        },
        TheNightWatch: {
          className: '.the-night-watch',
        },
        TheStormOnTheSeaOfGalilee: {
          className: '.the-storm-on-the-sea-of-galilee',
        },
      },
    )
})
