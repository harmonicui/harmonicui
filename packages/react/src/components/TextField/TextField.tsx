import React from 'react'
import { useId } from '@reach/auto-id'
import { RenderLessComponent } from '../../types'
import { renderChildren } from '../../utils'
import { TextFieldProps, TextFieldSlotProps } from './types'
import {
  InputContextProvider,
  LabelContextProvider,
  HelperTextContextProvider,
  ErrorMessageContextProvider,
} from '../../contexts'
import {
  ErrorMessageContract,
  HelperTextContract,
  InputContract,
  LabelContract,
} from '@harmonicui/contracts'

const TextField: RenderLessComponent<TextFieldProps, TextFieldSlotProps> = (props) => {
  const ID_SEQUENCE = useId()

  const IDs = {
    input: props.id ?? `HarmonicUI-TextField-Input-${ID_SEQUENCE}`,
    label: props.labelId ?? `HarmonicUI-TextField-Label-${ID_SEQUENCE}`,
    errorMessage: props.errorMessageId ?? `HarmonicUI-TextField-ErrorMessage-${ID_SEQUENCE}`,
    helperText: props.helperTextId ?? `HarmonicUI-TextField-HelperText-${ID_SEQUENCE}`,
  }

  const optional = props.optional ?? false
  const disabled = props.disabled ?? false
  const invalid = props.error ?? false

  function updateValue (value: string): void {
    props.onChange(value)
  }

  function clear () {
    updateValue('')
  }

  const slotProps: TextFieldSlotProps = {
    clear,
    invalid,
    optional,
    disabled,
    updateValue,
    id: IDs.input,
    value: props.value,
    labelId: IDs.label,
    required: !optional,
    helperTextId: IDs.helperText,
    errorMessageId: IDs.errorMessage,
    errorMessage: props.errorMessage ?? '',
  }

  const labelContext: Partial<LabelContract> = {
    invalid,
    disabled,
    optional,
    id: IDs.label,
    htmlFor: IDs.input,
  }

  const inputContext: Partial<InputContract> = {
    invalid,
    disabled,
    updateValue,
    id: IDs.input,
    value: props.value,
    required: !optional,
    ariaErrormessage: IDs.errorMessage,
    ariaDescribedby: IDs.helperText,
  }

  const errorMessageContext: Partial<ErrorMessageContract> = {
    visible: invalid,
    id: IDs.errorMessage,
    message: props.errorMessage,
  }

  const hintMessageContext: Partial<HelperTextContract> = {
    visible: !invalid,
    id: IDs.helperText,
  }

  return (
    <LabelContextProvider value={labelContext}>
      <InputContextProvider value={inputContext}>
        <ErrorMessageContextProvider value={errorMessageContext}>
          <HelperTextContextProvider value={hintMessageContext}>
            {
              renderChildren<TextFieldSlotProps>(props.children, slotProps)
            }
          </HelperTextContextProvider>
        </ErrorMessageContextProvider>
      </InputContextProvider>
    </LabelContextProvider>
  )
}

TextField.displayName = 'TextField'

export {
  TextField,
}
