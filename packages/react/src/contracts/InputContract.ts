import { createContext } from './utils/createContext'

interface InputContract {
  id: string | null,
  invalid: boolean,
  required: boolean,
  disabled: boolean,
  value: string | number | undefined,
  ariaDescribedby: string | null,
  ariaErrormessage: string | null,
  updateValue: ((value: string) => void) | null,
}

const _defaults: InputContract = {
  id: null,
  value: undefined,
  invalid: false,
  required: true,
  disabled: false,
  updateValue: null,
  ariaDescribedby: null,
  ariaErrormessage: null,
}

const InputContext = createContext<InputContract>('InputContract', _defaults)
const useInputContext = InputContext.consume
const InputContextProvider = InputContext.Provider

export {
  InputContract,
  InputContext,
  useInputContext,
  InputContextProvider,
}
