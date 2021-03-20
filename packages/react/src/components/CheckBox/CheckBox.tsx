import React from 'react'
import { useId } from '@reach/auto-id'
import { renderChildren } from '../../utils'
import { RenderLessComponent } from '../../types'
import { CheckBoxProps, CheckBoxSlotProps } from './types'
import {
  ErrorMessageContextProvider,
  HelperTextContextProvider,
  CheckBoxContextProvider,
  LabelContextProvider,
} from '../../contexts'
import {
  ErrorMessageContract,
  CheckBoxContract,
  LabelContract,
} from '@harmonicui/contracts'

const CheckBox: RenderLessComponent<CheckBoxProps, CheckBoxSlotProps> = (
  props,
) => {
  const updateChecked = (value: boolean): void => {
    props.onClick(value)
  }

  const updateValue = (value: string): void => {
    props.onChange(value)
  }

  const ID_SEQUENCE = useId()

  const optional = props.optional ?? false
  const disabled = props.disabled ?? false
  const checked = props.checked ?? false
  const invalid = props.error ?? false

  const IDs = {
    checkbox: props.id ?? `HarmonicUI-CheckBox-${ID_SEQUENCE}`,
    label: props.labelId ?? `HarmonicUI-CheckBox-Label-${ID_SEQUENCE}`,
    errorMessage:
      props.errorMessageId ?? `HarmonicUI-CheckBox-ErrorMessage-${ID_SEQUENCE}`,
    helperText:
      props.helperTextId ?? `HarmonicUI-CheckBox-HelperText-${ID_SEQUENCE}`,
  }

  const slotProps: CheckBoxSlotProps = {
    invalid,
    updateChecked,
    optional,
    disabled,
    checked,
    updateValue,
    error: invalid,
    id: IDs.checkbox,
    value: props.value,
    labelId: IDs.label,
    required: !optional,
    helperTextId: IDs.helperText,
    errorMessage: props.errorMessage,
    errorMessageId: IDs.errorMessage,
  }

  const labelContext: Partial<LabelContract> = {
    optional,
    disabled,
    invalid,
    id: IDs.label,
    htmlFor: IDs.checkbox,
  }

  const CheckBoxContext: Partial<CheckBoxContract> = {
    invalid,
    updateChecked,
    disabled,
    checked,
    updateValue,
    id: IDs.checkbox,
    required: !optional,
    value: props.value,
    ariaDescribedby: IDs.helperText,
    ariaErrormessage: IDs.errorMessage,
  }

  const ErrorMessage: Partial<ErrorMessageContract> = {
    hidden: !invalid,
    id: IDs.errorMessage,
    message: props.errorMessage,
  }

  const HelperText = {
    hidden: !invalid,
    id: IDs.helperText,
  }

  return (
    <CheckBoxContextProvider value={CheckBoxContext}>
      <LabelContextProvider value={labelContext}>
        <ErrorMessageContextProvider value={ErrorMessage}>
          <HelperTextContextProvider value={HelperText}>
            {renderChildren<CheckBoxSlotProps>(props.children, slotProps)}
          </HelperTextContextProvider>
        </ErrorMessageContextProvider>
      </LabelContextProvider>
    </CheckBoxContextProvider>
  )
}

CheckBox.displayName = 'CheckBox'

export { CheckBox }
