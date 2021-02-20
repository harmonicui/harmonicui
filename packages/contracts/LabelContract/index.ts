interface LabelContract {
  id: string | null,
  htmlFor: string | null,
  invalid: boolean,
  disabled: boolean,
  optional: boolean,
}

const LabelContractDefaultValues: LabelContract = {
  id: null,
  htmlFor: null,
  invalid: false,
  disabled: false,
  optional: false,
}

export {
  LabelContract,
  LabelContractDefaultValues,
}
