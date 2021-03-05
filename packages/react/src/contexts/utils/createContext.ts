import React from 'react'
import { throwUnperformedContractWarning } from './throwUnperformedContractWarning'

type Context<Contract> = {
  Provider: React.Provider<Partial<Contract>>
  consume: (defaultValue?: Partial<Contract>) => Contract
}

type Class<T> = { new (): T }

function createContext<ContractType> (Contract: Class<ContractType>, name?: string): Context<ContractType> {
  const context = React.createContext<Partial<ContractType>>({})
  context.displayName = name ?? Contract.name

  const contractDefaults = new Contract()

  return {
    Provider: context.Provider,

    consume: (defaultValue) => {
      const value = React.useContext(context)

      if (isEmpty(value)) {
        throwUnperformedContractWarning(Contract.name)
        return { ...contractDefaults, ...defaultValue }
      }

      return { ...contractDefaults, ...value }
    },
  }
}

function isEmpty (value: Record<string, unknown>) {
  return value && Object.keys(value).length === 0 && value.constructor === Object
}

export { createContext }
