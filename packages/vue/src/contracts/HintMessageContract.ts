import { inject, InjectionKey, provide } from 'vue'
import { throwUnperformedContractWarning } from './utils/throwUnperformedContractWarning'
import { Consumer, Provider } from '../types'

type HintMessageContract = {
  id: string | null,
  visible: boolean,
}

const HintMessageContextKey: InjectionKey<HintMessageContract> = Symbol('HintMessageContext')

const _defaults: HintMessageContract = {
  id: null,
  visible: true,
}

const provideHintMessageContext: Provider<HintMessageContract> = (context) => {
  provide(HintMessageContextKey, context)
}

const useHintMessageContext: Consumer<HintMessageContract> = (defaultValue) => {
  const context = inject(HintMessageContextKey, defaultValue)

  if (context === undefined) {
    throwUnperformedContractWarning('HintMessageContract')
    return _defaults
  }

  return { ..._defaults, ...context }
}

const HintMessageContext = {
  provide: provideHintMessageContext,
  consume: useHintMessageContext,
}

export {
  HintMessageContract,
  HintMessageContext,
  provideHintMessageContext,
  useHintMessageContext,
}
