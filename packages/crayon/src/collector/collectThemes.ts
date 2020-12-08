import { ThemeCollection, UserTheme, UserThemeCollection } from '../types'
import generateClassName from './generateClassName'

export default function collectThemes (themes: UserThemeCollection): ThemeCollection {
  return Object.entries(themes).reduce((collection, [themeName, theme]) => {
    return Object.assign(collection, collectTheme(themeName, theme))
  }, {})
}

function collectTheme (name: string, theme: UserTheme) {
  return {
    [name]: {
      className: generateClassName(theme.className),
      ...extractThemeModifiers(theme),
    },
  }
}

function extractThemeModifiers (theme: UserTheme) {
  if (theme.modifiers) {
    return {
      modifiers: Object.entries(theme.modifiers).reduce((modifiers, [modifierName]) => {
        return Object.assign(modifiers, extractModifier(theme.className, modifierName))
      }, {}),
    }
  }
}

function extractModifier (className: string, modifierName: string) {
  return {
    [modifierName]: generateClassName(className, modifierName),
  }
}
