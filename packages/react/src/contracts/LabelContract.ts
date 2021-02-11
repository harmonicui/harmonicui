import { createContext } from './utils/createContext'

interface LabelContract {
  id: string | null,
  htmlFor: string | null,
  invalid: boolean,
  disabled: boolean,
  optional: boolean,
}

const _defaults: LabelContract = {
  id: null,
  htmlFor: null,
  invalid: false,
  disabled: false,
  optional: false,
}

const LabelContext = createContext<LabelContract>('LabelContract', _defaults)
const useLabelContext = LabelContext.consume
const LabelContextProvider = LabelContext.Provider

export {
  LabelContract,
  LabelContext,
  useLabelContext,
  LabelContextProvider,
}
