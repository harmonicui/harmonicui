export class InputContract {
  readonly required: boolean = true
  readonly disabled: boolean = false
  readonly id: string | undefined = undefined
  readonly value: string | number | undefined = undefined
  readonly setValue: ((value: string) => void) | undefined = undefined
  readonly 'aria-invalid': boolean = false
  readonly 'aria-errormessage': string | undefined = undefined
  readonly 'aria-describedby': string | undefined = undefined
}
