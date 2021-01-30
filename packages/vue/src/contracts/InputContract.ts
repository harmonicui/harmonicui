import { inject, InjectionKey, provide } from 'vue'
import { throwUnperformedContractWarning } from './utils/throwUnperformedContractWarning'
import { Consumer, Provider } from '../types'

type InputContract = {
  id: string | null,
  invalid: boolean,
  required: boolean,
  disabled: boolean,
  value: string | number | null,
  ariaDescribedby: string | null,
  ariaErrormessage: string | null,
  updateValue: ((value: string | number) => void) | null,
}

const InputContextKey: InjectionKey<InputContract> = Symbol('InputContext')

const _defaults: InputContract = {
  id: null,
  value: null,
  invalid: false,
  required: true,
  disabled: false,
  updateValue: null,
  ariaDescribedby: null,
  ariaErrormessage: null,
}

const provideInputContext: Provider<InputContract> = (context) => {
  provide(InputContextKey, context)
}

const useInputContext: Consumer<InputContract> = (defaultValue) => {
  const context = inject(InputContextKey, defaultValue)

  if (context === undefined) {
    throwUnperformedContractWarning('InputContract')
    return _defaults
  }

  return { ..._defaults, ...context }
}

const InputContext = {
  provide: provideInputContext,
  consume: useInputContext,
}

export {
  InputContract,
  InputContext,
  provideInputContext,
  useInputContext,
}
