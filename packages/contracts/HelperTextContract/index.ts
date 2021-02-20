interface HelperTextContract {
  id: string | null,
  visible: boolean,
}

const HelperTextContractDefaultValues: HelperTextContract = {
  id: null,
  visible: true,
}

export {
  HelperTextContract,
  HelperTextContractDefaultValues,
}
