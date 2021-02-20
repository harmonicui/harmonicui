import { Consumer, Provider } from '../../types'
import { inject, InjectionKey, provide } from 'vue'
import { throwUnperformedContractWarning } from './throwUnperformedContractWarning'

interface Context<Contract> {
  provide: Provider<Contract>
  consume: Consumer<Contract>
}

export function createContext<Contract> (contractName: string, contractDefaultValue: Contract): Context<Contract> {
  const context: InjectionKey<Contract> = Symbol(contractName)

  return {
    provide: (value) => {
      provide(context, value)
    },

    consume: (defaultValue) => {
      const value = inject(context, defaultValue)

      if (value === undefined) {
        throwUnperformedContractWarning(contractName)
        return contractDefaultValue
      }

      return { ...contractDefaultValue, ...value }
    },
  }
}
