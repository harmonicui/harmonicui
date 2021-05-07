import { inject, InjectionKey, provide } from 'vue'

interface Context<T> {
  key: InjectionKey<T | null>
  provide: (value: T) => void
  consume: () => T
}

type EnforceToPassContract<Contract> =
  Contract extends void ?
    'Missing type parameter \'Contract\'. You must provide a contract type for creating context.'
    : string

export function createContext<Contract = void> (name: string & (EnforceToPassContract<Contract>)): Context<Contract> {
  const injectionKey: InjectionKey<Contract | null> = Symbol(name)

  return {
    key: injectionKey,

    provide: (value) => {
      provide(injectionKey, value)
    },

    consume: () => {
      const value = inject(injectionKey, null)

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
