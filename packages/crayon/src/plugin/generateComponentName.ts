import { e } from './tailwindUtils'

export default function generateComponentName (name: string, modifier?: string): string {
  return `.${e(convertToKebabCase(`${removeLeadingDot(name)}${addModifier(modifier)}`))}`
}

function removeLeadingDot (name: string): string {
  if (name.startsWith('.', 0)) {
    return name.substring(1)
  }

  return name
}

function addModifier (modifier?: string): string | undefined {
  if (modifier) {
    return `--${modifier}`
  }

  return ''
}

function convertToKebabCase (text: string): string {
  return text.replace(/([A-Z])([A-Z])/g, '$1-$2')
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()
}
