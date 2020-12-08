import { ThemeCollection, UserConfig } from '../types'
import collectThemes from './collectThemes'
import resolveThemes from '../utils/resolveThemes'

export default function collector (config: UserConfig): ThemeCollection {
  return collectThemes(resolveThemes(config))
}
