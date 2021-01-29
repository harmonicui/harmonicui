import { inject, InjectionKey, provide } from 'vue'
import { throwUnperformedContractWarning } from './utils/throwUnperformedContractWarning'

type LabelContract = {
  id: string | null,
  htmlFor: string | null,
  optional: boolean,
  disabled: boolean,
  invalid: boolean,
}

const LabelContextKey: InjectionKey<LabelContract> = Symbol('LabelContext')

const _defaults: LabelContract = {
  id: null,
  htmlFor: null,
  invalid: false,
  disabled: false,
  optional: false,
}

function provideLabelContext (context: Partial<LabelContract>): void {
  provide(LabelContextKey, context)
}

function useLabelContext (defaultValue?: LabelContract): LabelContract {
  const context = inject(LabelContextKey, defaultValue)

  if (context === undefined) {
    throwUnperformedContractWarning('LabelContract')
    return _defaults
  }

  return { ..._defaults, ...context }
}

const LabelContext = {
  provide: provideLabelContext,
  consume: useLabelContext,
}

export {
  LabelContract,
  LabelContext,
  provideLabelContext,
  useLabelContext,
}
