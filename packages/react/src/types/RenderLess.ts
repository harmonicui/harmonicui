import { ReactElement, ReactNode } from 'react'

export type RenderProp<Props> = (props: Props) => ReactNode
export type RenderLessComponentChildren<SlotProps> = ReactNode | RenderProp<SlotProps>

export type RenderLessComponentWithChildren<P, SlotPropsType> =
  P & { children?: RenderLessComponentChildren<SlotPropsType> }

export interface RenderLessComponent<PropsType, SlotPropsType> {
  (props: RenderLessComponentWithChildren<PropsType, SlotPropsType>): ReactElement

  defaultProps?: Partial<PropsType>
  displayName?: string
}
