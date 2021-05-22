import { computed, defineComponent, ref } from 'vue'
import { useGenerateDataIsAttribute, useGenerateId } from '../../composable'
import { render, unrefAllRefs } from '../../utils'
import {
  ErrorMessageContract,
  HelperTextContract,
  LabelContract,
  provideErrorMessageContext,
  provideHelperTextContext,
  provideLabelContext,
  provideTextFieldInputContext,
  TextFieldInputContract,
} from '../../contexts'

export default defineComponent({
  name: 'TextField',

  inheritAttrs: false,

  props: {
    as: {
      type: String,
      default: 'fragment',
      validator: (value: string) => {
        return ['div', 'fragment'].indexOf(value) !== -1
      },
    },

    inputId: {
      type: String,
      default: () => useGenerateId('TextFieldInput'),
    },

    labelId: {
      type: String,
      default: () => useGenerateId('TextFieldLabel'),
    },

    errorMessageId: {
      type: String,
      default: () => useGenerateId('TextFieldErrorMessage'),
    },

    helperTextId: {
      type: String,
      default: () => useGenerateId('TextFieldHelperText'),
    },

    optional: {
      type: Boolean,
      default: false,
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    invalid: {
      type: Boolean,
      default: false,
    },

    modelValue: {
      type: [String, Number],
    },
  },

  emits: ['update:modelValue'],

  setup (props, {
    slots,
    emit,
    attrs,
  }) {
    const refs = {
      input: ref<TextFieldInputContract['ref']['value']>(null),
      label: ref<LabelContract['ref']['value']>(null),
      helperText: ref<HelperTextContract['ref']['value']>(null),
      errorMessage: ref<ErrorMessageContract['ref']['value']>(null),
    }

    function setValue (value: string | number) {
      emit('update:modelValue', value)
    }

    const inputProps = {
      id: props.inputId,
      required: !props.optional,
      disabled: props.disabled,
      'aria-invalid': props.invalid ? true : undefined,
      'aria-describedby': computed(() => {
        return refs.helperText.value && !props.invalid ? props.helperTextId : undefined
      }),
      'aria-errormessage': computed(() => {
        return refs.errorMessage.value && props.invalid ? props.errorMessageId : undefined
      }),
    }

    const labelProps = {
      id: props.labelId,
      for: computed(() => {
        return refs.input.value ? props.inputId : undefined
      }),
      ...useGenerateDataIsAttribute({
        invalid: props.invalid,
        optional: props.optional,
        disabled: props.disabled,
      }),
    }

    const errorMessageProps = {
      id: props.errorMessageId,
      hidden: !props.invalid ? true : undefined,
    }

    const helperTextProps = {
      id: props.helperTextId,
      hidden: props.invalid ? true : undefined,
    }

    provideTextFieldInputContext({
      setValue,
      ref: refs.input,
      value: props.modelValue,
      ...inputProps,
    })

    provideLabelContext({ ref: refs.label, ...labelProps })
    provideErrorMessageContext({ ref: refs.errorMessage, ...errorMessageProps })
    provideHelperTextContext({ ref: refs.helperText, ...helperTextProps })

    return () => render({
      as: props.as,
      props: attrs,
      children: slots.default,
      childrenProps: {
        inputProps: {
          ref: refs.input,
          value: props.modelValue,
          onInput: (event: { target: { value: string } }) => setValue(event.target.value),
          ...unrefAllRefs(inputProps),
        },

        labelProps: { ref: refs.label, ...unrefAllRefs(labelProps) },
        errorMessageProps: { ref: refs.errorMessage, ...unrefAllRefs(errorMessageProps) },
        helperTextProps: { ref: refs.helperText, ...unrefAllRefs(helperTextProps) },

        required: !props.optional,
        disabled: props.disabled,
        invalid: props.invalid,
        optional: props.optional,
        clear: () => setValue(''),
      },
    })
  },
})
