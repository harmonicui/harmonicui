import { ReactNode } from 'react'

type Merge<T, U> = Omit<T, keyof U> & U

type PropsWithAs<P, T extends React.ElementType> = P & { as?: T }

export type PolymorphicPropsWithoutRef<P, T extends React.ElementType> =
  Merge<React.ComponentPropsWithoutRef<T>, PropsWithAs<P, T>>

export type RenderProp<Props> = (props: Props) => ReactNode

export type HybridChildren<ChildrenProps> = ReactNode | RenderProp<ChildrenProps>

export type ComponentWithHybridChildren<P, ChildrenProps> = P & { children?: HybridChildren<ChildrenProps> }
