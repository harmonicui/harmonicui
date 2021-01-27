import { inject, InjectionKey, provide } from 'vue'
import { throwUnperformedContractError } from './utils/throwUnperformedContractError'

interface InputContextContract {
  id: string,
  value: string | number,
  updateValue: (value: string | number) => void
  ariaErrormessage: string,
  ariaDescribedby: string,
  required: boolean,
  disabled: boolean,
  invalid: boolean,
}

const InputContextKey: InjectionKey<InputContextContract> = Symbol('InputContextContract')

function provideInputContext (context: InputContextContract): void {
  provide(InputContextKey, context)
}

function useInputContext (defaultValue?: InputContextContract): InputContextContract {
  const context = inject(InputContextKey, defaultValue)

  if (context === undefined) {
    throwUnperformedContractError('InputContextContract')
  }

  return context
}

export { InputContextContract }
export { provideInputContext, useInputContext }
