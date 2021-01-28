import { inject, InjectionKey, provide } from 'vue'
import { throwUnperformedContractError } from './utils/throwUnperformedContractError'

type HintMessageContextContract = Partial<{
  id: string,
  visible: boolean,
}>

const HintMessageContextKey: InjectionKey<HintMessageContextContract> = Symbol('HintMessageContextContract')

function provideHintMessageContext (context: HintMessageContextContract): void {
  provide(HintMessageContextKey, context)
}

function useHintMessageContext (defaultValue?: HintMessageContextContract): HintMessageContextContract {
  const context = inject(HintMessageContextKey, defaultValue)

  if (context === undefined) {
    throwUnperformedContractError('HintMessageContextContract')
  }

  return context
}

export { HintMessageContextContract }
export { provideHintMessageContext, useHintMessageContext }
