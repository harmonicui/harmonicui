import { computed, defineComponent, ref } from 'vue'
import { useGenerateDataIsAttribute, useGenerateId } from '../../composable'
import { render } from '../../utils'
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

  setup(props, { slots, emit, attrs }) {
    const refs = {
      input: ref<TextFieldInputContract['ref']['value']>(null),
      label: ref<LabelContract['ref']['value']>(null),
      helperText: ref<HelperTextContract['ref']['value']>(null),
      errorMessage: ref<ErrorMessageContract['ref']['value']>(null),
    }

    function setValue(value: string | number) {
      emit('update:modelValue', value)
    }

    provideTextFieldInputContext({
      setValue,
      ref: refs.input,
      value: computed(() => props.modelValue),
      id: props.inputId,
      required: !props.optional,
      disabled: props.disabled,
      'aria-invalid': props.invalid ? true : undefined,
      'aria-describedby': computed(() => {
        return refs.helperText.value && !props.invalid
          ? props.helperTextId
          : undefined
      }),
      'aria-errormessage': computed(() => {
        return refs.errorMessage.value && props.invalid
          ? props.errorMessageId
          : undefined
      }),
    })

    provideLabelContext({
      ref: refs.label,
      id: props.labelId,
      for: computed(() => {
        return refs.input.value ? props.inputId : undefined
      }),
      ...useGenerateDataIsAttribute({
        invalid: props.invalid,
        optional: props.optional,
        disabled: props.disabled,
      }),
    })

    provideErrorMessageContext({
      ref: refs.errorMessage,
      id: props.errorMessageId,
      hidden: !props.invalid ? true : undefined,
    })

    provideHelperTextContext({
      ref: refs.helperText,
      id: props.helperTextId,
      hidden: props.invalid ? true : undefined,
    })

    function clear(): void {
      setValue('')
    }

    return () =>
      render({
        as: props.as,
        props: attrs,
        children: slots.default,
        childrenProps: {
          required: !props.optional,
          disabled: props.disabled,
          invalid: props.invalid,
          optional: props.optional,
          clear,
        },
      })
  },
})
