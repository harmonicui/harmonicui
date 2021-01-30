export type Provider<Contract> = (context: Partial<Contract>) => void
export type Consumer<Contract> = (defaultValue?: Contract) => Contract
