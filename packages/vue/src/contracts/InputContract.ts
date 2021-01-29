import { inject, InjectionKey, provide } from 'vue'
import { throwUnperformedContractWarning } from './utils/throwUnperformedContractWarning'

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

function provideInputContext (context: Partial<InputContract>): void {
  provide(InputContextKey, context)
}

function useInputContext (defaultValue?: InputContract): InputContract {
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
