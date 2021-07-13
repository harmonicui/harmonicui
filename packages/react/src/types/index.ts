import { ReactNode } from 'react'

type Merge<T, U> = Omit<T, keyof U> & U

type PropsWithAs<Props, As extends React.ElementType> = Props & { as?: As }

export type PolymorphicPropsWithoutRef<Props, As extends React.ElementType> =
  Merge<React.ComponentPropsWithoutRef<As>, PropsWithAs<Props, As>>

export type RenderProp<Props> = (props: Props) => ReactNode

export type DynamicChildren<ChildrenProps> =
  | ReactNode
  | RenderProp<ChildrenProps>

export type ComponentWithDynamicChildren<Props, ChildrenProps> = Props & {
  children?: DynamicChildren<ChildrenProps>
}

type ComponentWithChildren<Props> = Props & {
  children?: ReactNode
}

export type PolymorphicComponentWithDynamicChildren<
  As extends React.ElementType,
  Props,
  ChildrenProps,
> = ComponentWithDynamicChildren<
  PolymorphicPropsWithoutRef<Props, As>,
  ChildrenProps
>

export type PolymorphicComponentWithChildren<
  As extends React.ElementType,
  Props,
> = ComponentWithChildren<PolymorphicPropsWithoutRef<Props, As>>
