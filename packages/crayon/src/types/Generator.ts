import { Properties as CSSProperties } from 'csstype'

declare module 'csstype' {
  interface Properties {
    boxSizing?: string
    clear?: string
    float?: string
  }
}

export type Generator = (value: string) => CSSProperties
