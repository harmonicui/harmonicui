import plugin from '../index'
import postcss from 'postcss'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const tailwindcss = require('tailwindcss')

test('generates expected css for themes', () => {
  return postcss([
    tailwindcss({
      corePlugins: false,
      plugins: [
        plugin({
          themes: ['src/__fixtures__/**/DaVinci.theme.js'],
        }),
      ],
    }),
  ]).process('@tailwind components;', { from: undefined })
    .then(result => {
      expect(result.css).toMatchCss(`
      .mona-lisa {
        background-color: #6366f1;
        padding-top: 1rem;
        width: 33.333333%
      }
      .last-supper {
        background-color: #937433;
        padding-right: 2rem;
        height: 40%
      }
      .lady-with-an-ermine {
        background-color: #937433;
        padding-right: 2rem;
        padding-left: 1.5rem;
        color: #1f2937
      }
      .lady-with-an-ermine--awesome {
        background-color: #f472b6;
        color: #064e3b
      }
      `)
    })
})
