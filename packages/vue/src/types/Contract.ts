export type Provider<Contract> = (value: Partial<Contract>) => void
export type Consumer<Contract> = (defaultValue?: Partial<Contract>) => Contract
