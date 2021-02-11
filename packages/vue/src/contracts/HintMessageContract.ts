import { createContext } from './utils/createContext'

type HintMessageContract = {
  id: string | null,
  visible: boolean,
}

const _defaults: HintMessageContract = {
  id: null,
  visible: true,
}

const HintMessageContext = createContext<HintMessageContract>('HintMessageContract', _defaults)

const provideHintMessageContext = HintMessageContext.provide
const useHintMessageContext = HintMessageContext.consume

export {
  HintMessageContract,
  HintMessageContext,
  provideHintMessageContext,
  useHintMessageContext,
}
