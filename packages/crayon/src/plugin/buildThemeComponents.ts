import buildComponent from './buildComponent'
import generateComponentName from '../utils/generateComponentName'
import { TailwindComponent, UserTheme } from '../types'

export default function buildThemeComponents (theme: UserTheme): TailwindComponent {
  return {
    ...buildStylesComponent(theme),
    ...buildModifiersComponents(theme),
  }
}

function buildStylesComponent (theme: UserTheme): TailwindComponent | undefined {
  if (theme.styles) {
    return buildComponent(generateComponentName(theme.className), theme.styles)
  }
}

function buildModifiersComponents (theme: UserTheme): TailwindComponent | undefined {
  if (theme.modifiers) {
    return Object.entries(theme.modifiers)
      .reduce((components, [modifierName, modifierStyles]) => {
        const componentName = generateComponentName(theme.className, modifierName)
        return Object.assign(components, buildComponent(componentName, modifierStyles))
      }, {})
  }
}
