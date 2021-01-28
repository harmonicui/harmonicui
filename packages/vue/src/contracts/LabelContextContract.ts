import { inject, InjectionKey, provide } from 'vue'
import { throwUnperformedContractError } from './utils/throwUnperformedContractError'

type LabelContextContract = Partial<{
  id: string | null,
  htmlFor: string | null,
  optional: boolean,
  disabled: boolean,
  invalid: boolean,
}>

const LabelContextKey: InjectionKey<LabelContextContract> = Symbol('LabelContextContract')

function provideLabelContext (context: LabelContextContract): void {
  provide(LabelContextKey, context)
}

function useLabelContext (defaultValue?: LabelContextContract): LabelContextContract {
  const context = inject(LabelContextKey, defaultValue)

  if (context === undefined) {
    throwUnperformedContractError('LabelContextContract')
  }

  return context
}

export { LabelContextContract }
export { provideLabelContext, useLabelContext }
