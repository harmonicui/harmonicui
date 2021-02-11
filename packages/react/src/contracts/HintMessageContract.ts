import { createContext } from './utils/createContext'

interface HintMessageContract {
  id: string | null,
  visible: boolean,
}

const _defaults: HintMessageContract = {
  id: null,
  visible: true,
}

const HintMessageContext = createContext<HintMessageContract>('HintMessageContract', _defaults)
const useHintMessageContext = HintMessageContext.consume
const HintMessageContextProvider = HintMessageContext.Provider

export {
  HintMessageContract,
  HintMessageContext,
  useHintMessageContext,
  HintMessageContextProvider,
}
