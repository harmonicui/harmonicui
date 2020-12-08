// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import escapeClassName from 'tailwindcss/lib/util/escapeClassName'

export default function generateClassName (name: string, modifier?: string): string {
  return `.${escapeClassName(convertToKebabCase(`${removeLeadingDot(name)}${addModifier(modifier)}`))}`
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
