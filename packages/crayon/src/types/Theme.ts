export type Styles = {
  [property: string]: string
}

export type UserTheme = {
  className: string,
  styles?: Styles,
  modifiers?: { [name: string]: Styles },
}

export type UserThemeCollection = {
  [name: string]: UserTheme
}
