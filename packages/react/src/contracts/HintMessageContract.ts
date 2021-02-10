import { createContext, useContext } from 'react'
import { throwUnperformedContractWarning } from './utils/throwUnperformedContractWarning'

interface HintMessageContract {
  id: string | null,
  visible: boolean,
}

type Consumer<Contract> = (defaultValue?: Contract) => Contract

const _defaults: HintMessageContract = {
  id: null,
  visible: true,
}

const HintMessageContextKey = createContext<Partial<HintMessageContract>>({})
HintMessageContextKey.displayName = 'HintMessageContext'

const ProvideHintMessageContext = HintMessageContextKey.Provider

const useHintMessageContext: Consumer<HintMessageContract> = (defaultValue) => {
  const context = useContext(HintMessageContextKey)

  if (Object.keys(context).length === 0) {
    throwUnperformedContractWarning('HintMessageContract')
    return { ..._defaults, ...defaultValue }
  }

  return { ..._defaults, ...context }
}

const HintMessageContext = {
  Provider: ProvideHintMessageContext,
  use: useHintMessageContext,
}

export {
  HintMessageContract,
  HintMessageContext,
  useHintMessageContext,
  ProvideHintMessageContext,
}
