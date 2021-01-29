import { inject, InjectionKey, provide } from 'vue'
import { throwUnperformedContractWarning } from './utils/throwUnperformedContractWarning'

type HintMessageContract = {
  id: string | null,
  visible: boolean,
}

const HintMessageContextKey: InjectionKey<HintMessageContract> = Symbol('HintMessageContext')

const _defaults: HintMessageContract = {
  id: null,
  visible: true,
}

function provideHintMessageContext (context: Partial<HintMessageContract>): void {
  provide(HintMessageContextKey, context)
}

function useHintMessageContext (defaultValue?: HintMessageContract): HintMessageContract {
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
