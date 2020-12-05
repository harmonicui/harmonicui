import { TailwindUtils, UserConfig } from '../types'
import resolveThemes from '../utils/resolveThemes'
import { processThemes } from './processThemes'
import { storeTailwindUtils } from '../utils/tailwindUtils'

export default function plugin (config: UserConfig) {
  return function (tailwindUtils: TailwindUtils): void {
    storeTailwindUtils(tailwindUtils)

    tailwindUtils.addComponents(
      processThemes(resolveThemes(config),
      ),
    )
  }
}
