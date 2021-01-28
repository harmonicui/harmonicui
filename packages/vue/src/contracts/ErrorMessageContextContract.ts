import { inject, InjectionKey, provide } from 'vue'
import { throwUnperformedContractError } from './utils/throwUnperformedContractError'

type ErrorMessageContextContract = Partial<{
  id: string,
  message: string,
  visible: boolean,
}>

const ErrorMessageContextKey: InjectionKey<ErrorMessageContextContract> = Symbol('ErrorMessageContextContract')

function provideErrorMessageContext (context: ErrorMessageContextContract): void {
  provide(ErrorMessageContextKey, context)
}

function useErrorMessageContext (defaultValue?: ErrorMessageContextContract): ErrorMessageContextContract {
  const context = inject(ErrorMessageContextKey, defaultValue)

  if (context === undefined) {
    throwUnperformedContractError('ErrorMessageContextContract')
  }

  return context
}

export { ErrorMessageContextContract }
export { provideErrorMessageContext, useErrorMessageContext }
