export function throwUnperformedContractWarning (contract: string): void {
  console.warn(`
    [ HarmonicUI: UnperformedContractWarning ]: No provider performed the ${contract}.
    Probably no provider exists in the component tree for this contract.
    For now, the default values will be used.
    `)
}
