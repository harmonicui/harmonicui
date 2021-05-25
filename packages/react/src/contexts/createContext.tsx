import React, { ReactNode } from 'react'

type Provider<Contract> = {
  (props: { value: Contract; children?: ReactNode | ReactNode[] }): JSX.Element
  displayName?: string
}

type Context<Contract> = {
  Provider: Provider<Contract>
  consume: () => Contract
}

type EnforceToPassContract<Contract> = Contract extends void
  ? "Missing type parameter 'Contract'. You must provide a contract type for creating context."
  : string

function createContext<Contract = void>(
  name: string & EnforceToPassContract<Contract>,
): Context<Contract> {
  const context = React.createContext<Contract | null>(null)
  context.displayName = name

  const Provider: Provider<Contract> = props => {
    return (
      <context.Provider value={props.value}>{props.children}</context.Provider>
    )
  }
  Provider.displayName = `${name}Provider`

  return {
    Provider,

    consume: () => {
      const value = React.useContext(context)

      if (value === null) {
        throw new Error(`
          [ Harmonic UI ]
          Error: No provider found for ${name}, Probably no provider exists in
          the component tree for this context. Please wrap the consumer component with a provider.
       `)
      }

      return value
    },
  }
}

export { createContext }
