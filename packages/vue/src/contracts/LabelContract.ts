import { inject, InjectionKey, provide } from 'vue'
import { throwUnperformedContractWarning } from './utils/throwUnperformedContractWarning'
import { Consumer, Provider } from '../types'

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

const provideLabelContext: Provider<LabelContract> = (context) => {
  provide(LabelContextKey, context)
}

const useLabelContext: Consumer<LabelContract> = (defaultValue) => {
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
