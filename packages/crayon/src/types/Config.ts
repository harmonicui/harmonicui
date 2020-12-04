export type PresetConfig = {
  name: string,
  themes: Array<string>
}

export type UserConfig = {
  themes?: Array<string>,
  presets?: Array<string | PresetConfig> | string
}
