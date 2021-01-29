import { inject, InjectionKey, provide } from 'vue'
import { throwUnperformedContractWarning } from './utils/throwUnperformedContractWarning'

type ErrorMessageContract = {
  id: string | null,
  message: string | null,
  visible: boolean | null,
}

const ErrorMessageContextKey: InjectionKey<ErrorMessageContract> = Symbol('ErrorMessageContext')

const _defaults: ErrorMessageContract = {
  id: null,
  message: null,
  visible: false,
}

function provideErrorMessageContext (context: Partial<ErrorMessageContract>): void {
  provide(ErrorMessageContextKey, context)
}

function useErrorMessageContext (defaultValue?: ErrorMessageContract): ErrorMessageContract {
  const context = inject(ErrorMessageContextKey, defaultValue)

  if (context === undefined) {
    throwUnperformedContractWarning('ErrorMessageContract')
    return _defaults
  }

  return { ..._defaults, ...context }
}

const ErrorMessageContext = {
  provide: provideErrorMessageContext,
  consume: useErrorMessageContext,
}

export { ErrorMessageContract }
export {
  ErrorMessageContext,
  provideErrorMessageContext,
  useErrorMessageContext,
}
