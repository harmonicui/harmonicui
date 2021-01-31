import { createContext, useContext } from 'react'
import { throwUnperformedContractWarning } from './utils/throwUnperformedContractWarning'

interface InputContract {
  id: string | null,
  invalid: boolean,
  required: boolean,
  disabled: boolean,
  value: string | number | null,
  ariaDescribedby: string | null,
  ariaErrormessage: string | null,
  updateValue: ((value: string | number) => void) | null,
}

type Consumer<Contract> = (defaultValue?: Contract) => Contract

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

const InputContextKey = createContext<Partial<InputContract>>({})
InputContextKey.displayName = 'InputContext'

const ProvideInputContext = InputContextKey.Provider

const useInputContext: Consumer<InputContract> = (defaultValue) => {
  const context = useContext(InputContextKey)

  if (Object.keys(context).length === 0) {
    throwUnperformedContractWarning('InputContract')
    return { ..._defaults, ...defaultValue }
  }

  return { ..._defaults, ...context }
}

const InputContext = {
  Provider: ProvideInputContext,
  use: useInputContext,
}

export {
  InputContract,
  InputContext,
  useInputContext,
  ProvideInputContext,
}
