import { createContext, useContext } from 'react'
import { throwUnperformedContractWarning } from './utils/throwUnperformedContractWarning'

interface ErrorMessageContract {
  id: string | null,
  message: string | null,
  visible: boolean | null,
}

type Consumer<Contract> = (defaultValue?: Contract) => Contract

const _defaults: ErrorMessageContract = {
  id: null,
  message: null,
  visible: false,
}

const ErrorMessageContextKey = createContext<Partial<ErrorMessageContract>>({})
ErrorMessageContextKey.displayName = 'ErrorMessageContext'

const ProvideErrorMessageContext = ErrorMessageContextKey.Provider

const useErrorMessageContext: Consumer<ErrorMessageContract> = (defaultValue) => {
  const context = useContext(ErrorMessageContextKey)

  if (Object.keys(context).length === 0) {
    throwUnperformedContractWarning('ErrorMessageContract')
    return { ..._defaults, ...defaultValue }
  }

  return { ..._defaults, ...context }
}

const ErrorMessageContext = {
  Provider: ProvideErrorMessageContext,
  use: useErrorMessageContext,
}

export {
  ErrorMessageContract,
  ErrorMessageContext,
  useErrorMessageContext,
  ProvideErrorMessageContext,
}
