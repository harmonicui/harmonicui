import { createContext, useContext } from 'react'
import { throwUnperformedContractWarning } from './utils/throwUnperformedContractWarning'

interface LabelContract {
  id: string | null,
  htmlFor: string | null,
  invalid: boolean,
  disabled: boolean,
  optional: boolean,
}

type Consumer<Contract> = (defaultValue?: Contract) => Contract

const _defaults: LabelContract = {
  id: null,
  htmlFor: null,
  invalid: false,
  disabled: false,
  optional: false,
}

const LabelContextKey = createContext<Partial<LabelContract>>({})
LabelContextKey.displayName = 'LabelContext'

const ProvideLabelContext = LabelContextKey.Provider

const useLabelContext: Consumer<LabelContract> = (defaultValue) => {
  const context = useContext(LabelContextKey)

  if (Object.keys(context).length === 0) {
    throwUnperformedContractWarning('LabelContract')
    return { ..._defaults, ...defaultValue }
  }

  return { ..._defaults, ...context }
}

const LabelContext = {
  Provider: ProvideLabelContext,
  use: useLabelContext,
}

export {
  LabelContract,
  LabelContext,
  useLabelContext,
  ProvideLabelContext,
}
