import { Properties as CSSProperties } from 'csstype'

declare module 'csstype' {
  interface Properties {
    boxSizing?: string
    float?: string
  }
}

export type Generator = (value: string) => CSSProperties
