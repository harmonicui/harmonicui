export class CheckBoxContract {
  readonly id: string | undefined = undefined
  readonly invalid: boolean = false
  readonly required: boolean = true
  readonly disabled: boolean = false
  readonly checked: boolean = false
  readonly indeterminate: boolean = false
  readonly value: string | number | undefined = undefined
  readonly ariaDescribedby: string | undefined = undefined
  readonly ariaErrormessage: string | undefined = undefined
  readonly updateValue: ((value: string) => void) | undefined = undefined
  readonly updateChecked: ((value: boolean) => void) | undefined = undefined
}
