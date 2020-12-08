type ThemeModifiers = {
  [name: string]: string
}
type Theme = {
  className: string
  modifiers?: ThemeModifiers
}

export type ThemeCollection = {
  [name: string]: Theme
}
