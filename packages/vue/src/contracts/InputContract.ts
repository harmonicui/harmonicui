import { createContext } from './utils/createContext'

type InputContract = {
  id: string | null,
  invalid: boolean,
  required: boolean,
  disabled: boolean,
  value: string | number | null,
  ariaDescribedby: string | null,
  ariaErrormessage: string | null,
  updateValue: ((value: string | number) => void) | null,
}

const _defaults: InputContract = {
  id: null,
  value: null,
  invalid: false,
  required: true,
  disabled: false,
  updateValue: null,
  ariaDescribedby: null,
  ariaErrormessage: null,
}

const InputContext = createContext<InputContract>('InputContract', _defaults)

const provideInputContext = InputContext.provide
const useInputContext = InputContext.consume

export {
  InputContract,
  InputContext,
  provideInputContext,
  useInputContext,
}
