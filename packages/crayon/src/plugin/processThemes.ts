import { TailwindComponent, UserThemeCollection } from '../types'
import buildThemeComponents from './buildThemeComponents'

export function processThemes (themes: UserThemeCollection): TailwindComponent {
  return Object.entries(themes).reduce((components, [, theme]) => {
    return Object.assign(components, buildThemeComponents(theme))
  }, {})
}
