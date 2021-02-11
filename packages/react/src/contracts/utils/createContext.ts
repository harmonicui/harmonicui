import React from 'react'
import { throwUnperformedContractWarning } from './throwUnperformedContractWarning'

type Context<Contract> = {
  Provider: React.Provider<Partial<Contract>>
  consume: (defaultValue?: Partial<Contract>) => Contract
}

function createContext<Contract> (contractName: string, contractDefaults: Contract): Context<Contract> {
  const context = React.createContext<Partial<Contract>>({})
  context.displayName = contractName.replace('Contract', 'Context')

  return {
    Provider: context.Provider,

    consume: (defaultValue) => {
      const value = React.useContext(context)

      if (isEmpty(value)) {
        throwUnperformedContractWarning(contractName)
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
