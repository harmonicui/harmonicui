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
import { TextFieldInput } from '../TextFieldInput/TextFieldInput'
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
  TextFieldInputContextProvider,
  TextFieldInputContract,
} from '../../contexts'

export type TextFieldOwnProps = {
  invalid?: boolean
  optional?: boolean
  disabled?: boolean
  inputId?: string
  labelId?: string
  helperTextId?: string
  errorMessageId?: string
  value?: string | number
  onChange?: (newValue: string | number) => void
}

interface TextFieldChildrenProps {
  disabled: boolean
  invalid: boolean
  required: boolean
  optional: boolean
  clear: () => void
}

const DEFAULT_ELEMENT = Fragment

export type TextFieldProps<T extends ElementType = typeof DEFAULT_ELEMENT> =
  ComponentWithDynamicChildren<
    PolymorphicPropsWithoutRef<TextFieldOwnProps, T>,
    TextFieldChildrenProps
  >

function TextField<T extends ElementType = typeof DEFAULT_ELEMENT>({
  as,
  children,
  onChange,
  value = '',
  invalid = false,
  optional = false,
  disabled = false,
  inputId = useGenerateId('TextFieldInput'),
  labelId = useGenerateId('TextFieldLabel'),
  helperTextId = useGenerateId('TextFieldHelperText'),
  errorMessageId = useGenerateId('TextFieldErrorMessage'),
  ...attrs
}: TextFieldProps<T>): ReactElement {
  const inputRef = useRef<TextFieldInputContract['ref']['current']>(null)
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
    setValue: (newValue: string | number) => onChange?.(newValue),
    value,
    ref: inputRef,
    id: inputId,
    disabled,
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
    hidden: !invalid,
  }

  const helperTextProps = {
    ref: helperTextRef,
    id: helperTextId,
    hidden: invalid,
  }

  const Element: ElementType = as || DEFAULT_ELEMENT

  const childrenProps: TextFieldChildrenProps = {
    invalid,
    disabled,
    optional,
    required: !optional,
    clear: () => onChange?.(''),
  }

  return createElement(
    LabelContextProvider,
    { value: labelProps },
    createElement(
      TextFieldInputContextProvider,
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

TextField.displayName = 'TextField'

TextField.Label = Label
TextField.Input = TextFieldInput
TextField.HelperText = HelperText
TextField.ErrorMessage = ErrorMessage

export { TextField }
