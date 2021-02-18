import React, { createElement, Fragment, ReactElement, ReactNode } from 'react'
import { useId } from '@reach/auto-id'
import {
  LabelContract,
  InputContract,
  HintMessageContract,
  ErrorMessageContract,
  InputContextProvider,
  LabelContextProvider,
  HintMessageContextProvider,
  ErrorMessageContextProvider,
} from '../../contracts'

type RenderProp<SlotProps> = (props: SlotProps) => ReactNode
type RenderLessComponentChildren<SlotProps> = ReactNode | RenderProp<SlotProps>

function isRenderProp<SlotProps> (node: RenderLessComponentChildren<SlotProps>): node is RenderProp<SlotProps> {
  return typeof node === 'function'
}

function createRenderLessComponent<SlotProps> (children: RenderLessComponentChildren<SlotProps>, slotProps: SlotProps) {
  const content = isRenderProp(children) ? children(slotProps) : children
  return createElement(Fragment, null, content)
}

interface TextFieldSlotProps {
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

interface TextFieldProps {
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
  children?: RenderLessComponentChildren<TextFieldSlotProps>
}

function TextField ({ children, ...props }: TextFieldProps): ReactElement {
  const ID_SEQUENCE = useId()

  const IDs = {
    input: props.id ?? `HarmonicUI-TextField-Input-${ID_SEQUENCE}`,
    label: props.labelId ?? `HarmonicUI-TextField-Label-${ID_SEQUENCE}`,
    errorMessage: props.errorMessageId ?? `HarmonicUI-TextField-ErrorMessage-${ID_SEQUENCE}`,
    hintMessage: props.hintMessageId ?? `HarmonicUI-TextField-HintMessage-${ID_SEQUENCE}`,
  }

  const optional = props.optional ?? false
  const disabled = props.disabled ?? false
  const invalid = props.error ?? false

  function updateValue (value: string): void {
    props.onChange(value)
  }

  const slotProps: TextFieldSlotProps = {
    clear: () => { updateValue('') },
    invalid,
    optional,
    disabled,
    updateValue,
    id: IDs.input,
    value: props.value,
    labelId: IDs.label,
    required: !optional,
    hintMessageId: IDs.hintMessage,
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
    ariaDescribedby: IDs.hintMessage,
  }

  const errorMessageContext: Partial<ErrorMessageContract> = {
    visible: invalid,
    id: IDs.errorMessage,
    message: props.errorMessage,
  }

  const hintMessageContext: Partial<HintMessageContract> = {
    visible: !invalid,
    id: IDs.hintMessage,
  }

  return (
    <LabelContextProvider value={labelContext}>
      <InputContextProvider value={inputContext}>
        <ErrorMessageContextProvider value={errorMessageContext}>
          <HintMessageContextProvider value={hintMessageContext}>
            {createRenderLessComponent<TextFieldSlotProps>(children, slotProps)}
          </HintMessageContextProvider>
        </ErrorMessageContextProvider>
      </InputContextProvider>
    </LabelContextProvider>
  )
}

TextField.displayName = 'TextField'

export {
  TextField,
  TextFieldProps,
}
