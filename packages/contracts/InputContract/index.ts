export class InputContract {
  readonly id: string | undefined = undefined
  readonly invalid: boolean = false
  readonly required: boolean = true
  readonly disabled: boolean = false
  readonly value: string | number | undefined = undefined
  readonly ariaDescribedby: string | undefined = undefined
  readonly ariaErrormessage: string | undefined = undefined
  readonly updateValue: ((value: string) => void) | undefined = undefined
}
