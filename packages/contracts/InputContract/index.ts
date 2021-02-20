interface InputContract {
  id: string | undefined,
  invalid: boolean,
  required: boolean,
  disabled: boolean,
  value: string | number | undefined,
  ariaDescribedby: string | undefined,
  ariaErrormessage: string | undefined,
  updateValue: ((value: string) => void) | undefined,
}

const InputContractDefaultValues: InputContract = {
  id: undefined,
  value: undefined,
  invalid: false,
  required: true,
  disabled: false,
  updateValue: undefined,
  ariaDescribedby: undefined,
  ariaErrormessage: undefined,
}

export {
  InputContract,
  InputContractDefaultValues,
}
