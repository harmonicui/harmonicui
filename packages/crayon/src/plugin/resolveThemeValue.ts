import { theme } from '../utils/tailwindUtils'

export default function resolveThemeValue (path: string, defaultValue: string): string {
  const resolvedValue = theme(path)

  if (typeof resolvedValue === 'string') {
    return resolvedValue
  }

  return defaultValue
}
