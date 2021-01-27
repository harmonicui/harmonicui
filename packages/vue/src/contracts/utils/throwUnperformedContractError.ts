export function throwUnperformedContractError (contract: string): never {
  throw new Error(`
    [ UnperformedContractError ]: No provider fulfilled the ${contract}.
    Probably no provider exists in the DOM tree for this contract.
    `)
}
