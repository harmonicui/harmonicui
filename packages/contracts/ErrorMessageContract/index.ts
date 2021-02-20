interface ErrorMessageContract {
  id: string | null,
  message: string | null,
  visible: boolean | null,
}

const ErrorMessageContractDefaultValues: ErrorMessageContract = {
  id: null,
  message: null,
  visible: false,
}

export {
  ErrorMessageContract,
  ErrorMessageContractDefaultValues,
}
