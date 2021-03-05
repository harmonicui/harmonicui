import { Consumer, Provider } from '../../types'
import { inject, InjectionKey, provide } from 'vue'
import { throwUnperformedContractWarning } from './throwUnperformedContractWarning'

interface Context<Contract> {
  provide: Provider<Contract>
  consume: Consumer<Contract>
}

type Class<T> = { new (): T }

export function createContext<ContractType> (Contract: Class<ContractType>, name?: string): Context<ContractType> {
  const context: InjectionKey<ContractType> = Symbol(name ?? Contract.name)

  const contractDefaults = new Contract()

  return {
    provide: (value) => {
      provide(context, value)
    },

    consume: (defaultValue) => {
      const value = inject(context, defaultValue)

      if (value === undefined) {
        throwUnperformedContractWarning(Contract.name)
        return contractDefaults
      }

      return { ...contractDefaults, ...value }
    },
  }
}
