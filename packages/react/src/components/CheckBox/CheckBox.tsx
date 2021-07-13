import {
  createElement,
  ElementType,
  Fragment,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  ComponentWithDynamicChildren,
  PolymorphicPropsWithoutRef,
} from '../../types'
import { useGenerateId, useGenerateDataIsAttribute } from '../../hooks'
import { renderChildren } from '../../utils'
import { CheckBoxInput } from '../CheckBoxInput/CheckBoxInput'
import { ErrorMessage } from '../ErrorMessage/ErrorMessage'
import { HelperText } from '../HelperText/HelperText'
import { Label } from '../Label/Label'
import {
  ErrorMessageContextProvider,
  ErrorMessageContract,
  HelperTextContextProvider,
  HelperTextContract,
  LabelContextProvider,
  LabelContract,
  CheckBoxInputContextProvider,
  CheckBoxInputContract,
} from '../../contexts'

export type CheckBoxOwnProps = {
  invalid?: boolean
  optional?: boolean
  disabled?: boolean
  checked?: boolean
  indeterminate?: boolean
  inputId?: string
  labelId?: string
  helperTextId?: string
  errorMessageId?: string
  value?: string
  onChange?: (checked: boolean) => void
}

interface CheckBoxChildrenProps {
  disabled: boolean
  invalid: boolean
  required: boolean
  optional: boolean
  indeterminate: boolean
}

const DEFAULT_ELEMENT = Fragment

export type CheckBoxProps<T extends ElementType = typeof DEFAULT_ELEMENT> =
  ComponentWithDynamicChildren<
    PolymorphicPropsWithoutRef<CheckBoxOwnProps, T>,
    CheckBoxChildrenProps
  >

function CheckBox<T extends ElementType = typeof DEFAULT_ELEMENT>({
  as,
  children,
  onChange,
  value = '',
  invalid = false,
  optional = false,
  disabled = false,
  indeterminate = false,
  checked = false,
  inputId = useGenerateId('CheckBoxInput'),
  labelId = useGenerateId('CheckBoxLabel'),
  helperTextId = useGenerateId('CheckBoxHelperText'),
  errorMessageId = useGenerateId('CheckBoxErrorMessage'),
  ...attrs
}: CheckBoxProps<T>): ReactElement {
  const inputRef = useRef<CheckBoxInputContract['ref']['current']>(null)
  const labelRef = useRef<LabelContract['ref']['current']>(null)
  const helperTextRef = useRef<HelperTextContract['ref']['current']>(null)
  const errorMessageRef = useRef<ErrorMessageContract['ref']['current']>(null)

  const [htmlFor, setHtmlFor] = useState<string | undefined>(undefined)
  const [ariaDescribedBy, setAriaDescribedBy] =
    useState<string | undefined>(undefined)
  const [ariaErrorMessage, setAriaErrorMessage] =
    useState<string | undefined>(undefined)

  useEffect(() => {
    setHtmlFor(inputRef.current ? inputId : undefined)
  }, [inputRef])

  useEffect(() => {
    setAriaDescribedBy(
      helperTextRef.current && !invalid ? helperTextId : undefined,
    )
  }, [helperTextRef])

  useEffect(() => {
    setAriaErrorMessage(
      errorMessageRef.current && invalid ? errorMessageId : undefined,
    )
  }, [errorMessageRef])

  const inputProps = {
    toggleValue: (newValue: boolean) => onChange?.(newValue),
    value,
    ref: inputRef,
    id: inputId,
    disabled,
    indeterminate,
    checked: checked,
    required: !optional,
    'aria-describedby': ariaDescribedBy,
    'aria-errormessage': ariaErrorMessage,
    'aria-invalid': invalid || undefined,
  }

  const labelProps = {
    ref: labelRef,
    id: labelId,
    htmlFor: htmlFor,
    ...useGenerateDataIsAttribute({
      disabled,
      invalid,
      optional,
    }),
  }

  const errorMessageProps = {
    ref: errorMessageRef,
    id: errorMessageId,
    hidden: !invalid || indeterminate,
  }

  const helperTextProps = {
    ref: helperTextRef,
    id: helperTextId,
    hidden: invalid || indeterminate,
  }

  const Element: ElementType = as || DEFAULT_ELEMENT

  const childrenProps: CheckBoxChildrenProps = {
    invalid,
    disabled,
    optional,
    indeterminate,
    required: !optional,
  }

  return createElement(
    LabelContextProvider,
    { value: labelProps },
    createElement(
      CheckBoxInputContextProvider,
      { value: inputProps },
      createElement(
        ErrorMessageContextProvider,
        { value: errorMessageProps },
        createElement(
          HelperTextContextProvider,
          { value: helperTextProps },
          createElement(
            Element,
            attrs,
            renderChildren(children, childrenProps),
          ),
        ),
      ),
    ),
  )
}

CheckBox.displayName = 'CheckBox'

CheckBox.Label = Label
CheckBox.Input = CheckBoxInput
CheckBox.HelperText = HelperText
CheckBox.ErrorMessage = ErrorMessage

export { CheckBox }
