export class CheckBoxContract {
  readonly required: boolean = true
  readonly disabled: boolean = false
  readonly checked: boolean = false
  readonly id: string | undefined = undefined
  readonly value: string | undefined = undefined
  readonly indeterminate: boolean = false
  readonly modelValue: Array<string> | string | undefined = undefined
  readonly setModelValue: ((value: string) => void) | undefined = undefined
  readonly 'aria-invalid': boolean = false
  readonly 'aria-errormessage': string | undefined = undefined
  readonly 'aria-describedby': string | undefined = undefined
}
