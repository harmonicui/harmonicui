export interface TextFieldProps {
  id?: string
  value: string
  error?: boolean
  labelId?: string
  disabled?: boolean
  optional?: boolean
  errorMessage?: string
  hintMessageId?: string
  errorMessageId?: string
  onChange: (value: string) => void
}

export interface TextFieldSlotProps {
  id: string
  value: string
  labelId: string
  invalid: boolean
  disabled: boolean
  optional: boolean
  required: boolean
  clear: () => void
  errorMessage: string
  errorMessageId: string
  hintMessageId: string
  updateValue: (value: string) => void
}
