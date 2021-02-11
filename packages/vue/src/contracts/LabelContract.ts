import { createContext } from './utils/createContext'

type LabelContract = {
  id: string | null,
  htmlFor: string | null,
  optional: boolean,
  disabled: boolean,
  invalid: boolean,
}

const _defaults: LabelContract = {
  id: null,
  htmlFor: null,
  invalid: false,
  disabled: false,
  optional: false,
}

const LabelContext = createContext<LabelContract>('LabelContract', _defaults)

const provideLabelContext = LabelContext.provide
const useLabelContext = LabelContext.consume

export {
  LabelContract,
  LabelContext,
  provideLabelContext,
  useLabelContext,
}
