export interface CheckBoxProps {
  id?: string
  value: string
  error?: boolean
  labelId?: string
  invalid?: boolean
  required?: boolean
  optional?: boolean
  disabled?: boolean
  checked?: boolean
  errorMessage?:string
  helperTextId?: string
  errorMessageId?: string
  onChange: (value: string) => void
  onClick: (checked: boolean) => void
}

export interface CheckBoxSlotProps {
  id: string
  value: string
  labelId: string
  invalid: boolean
  error: boolean
  optional: boolean
  disabled: boolean
  required: boolean
  checked: boolean
  helperTextId: string
  errorMessage?:string
  errorMessageId: string
  updateChecked: (checked: boolean) => void
  updateValue: (value: string) => void
}
