/* eslint-disable @typescript-eslint/no-var-requires */
import { PresetConfig, UserConfig, UserThemeCollection } from '../types'
import { glob } from 'glob'

export default function resolveThemes (config: UserConfig): UserThemeCollection {
  return checkResolvedThemesNotToBeEmpty({
    ...resolveUserThemes(config.themes),
    ...resolvePresetThemes(config.presets),
  })
}

function resolveUserThemes (patterns?: Array<string>) {
  if (patterns) {
    return loadUserThemes(probeUserThemes(patterns))
  }
}

function resolvePresetThemes (presets: UserConfig['presets']) {
  if (presets) {
    if (typeof presets === 'string') {
      return loadPresetThemes(presets)
    }

    return presets.reduce((themes: UserThemeCollection, preset: string | PresetConfig) => {
      if (typeof preset === 'string') {
        return Object.assign(themes, loadPresetThemes(preset))
      }

      return Object.assign(themes, loadPresetThemesByList(preset.name, preset.themes))
    }, {})
  }
}

function checkResolvedThemesNotToBeEmpty (themes: UserThemeCollection) {
  if (!(Object.keys(themes).length > 0)) {
    throw new Error('Error: No themes resolved. Please add some themes or presets to your configuration.')
  }

  return themes
}

function probeUserThemes (patterns: Array<string>): Array<string> {
  return patterns.reduce((files: Array<string>, pattern) => {
    return files.concat(glob.sync(pattern, { absolute: true }))
  }, [])
}

function loadUserThemes (files: Array<string>): UserThemeCollection {
  return files.reduce((themes, file) => {
    return Object.assign(themes, require(file))
  }, {})
}

function loadPresetThemes (preset: string): UserThemeCollection {
  return require(preset)
}

function loadPresetThemesByList (preset: string, themesList: Array<string>) {
  return filterThemes(loadPresetThemes(preset), themesList)
}

function filterThemes (themes: UserThemeCollection, allowedThemes: Array<string>) {
  return Object.keys(themes)
    .filter(theme => allowedThemes.includes(theme))
    .reduce((result, theme) => Object.assign(result, { [theme]: themes[theme] }), {})
}
