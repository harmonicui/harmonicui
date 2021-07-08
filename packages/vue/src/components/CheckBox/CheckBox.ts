import { defineComponent, ref, computed } from 'vue'
import { useGenerateDataIsAttribute, useGenerateId } from '../../composable'
import { render } from '../../utils'
import {
  ErrorMessageContract,
  HelperTextContract,
  LabelContract,
  provideErrorMessageContext,
  provideHelperTextContext,
  provideLabelContext,
  provideCheckBoxInputContext,
  CheckBoxInputContract,
} from '../../contexts'

export default defineComponent({
  name: 'CheckBox',

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
      default: () => useGenerateId('CheckBoxInput'),
    },

    labelId: {
      type: String,
      default: () => useGenerateId('CheckBoxLabel'),
    },

    errorMessageId: {
      type: String,
      default: () => useGenerateId('CheckBoxErrorMessage'),
    },

    helperTextId: {
      type: String,
      default: () => useGenerateId('CheckBoxHelperText'),
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

    indeterminate: {
      type: Boolean,
      default: false,
    },

    value: {
      type: String,
    },

    modelValue: {
      type: Boolean,
    },
  },

  emits: ['update:modelValue'],

  setup(props, { slots, emit, attrs }) {
    const refs = {
      input: ref<CheckBoxInputContract['ref']['value']>(null),
      label: ref<LabelContract['ref']['value']>(null),
      helperText: ref<HelperTextContract['ref']['value']>(null),
      errorMessage: ref<ErrorMessageContract['ref']['value']>(null),
    }

    function toggleValue() {
      emit('update:modelValue', !props.modelValue)
    }

    provideCheckBoxInputContext({
      toggleValue,
      ref: refs.input,
      value: props.value,
      modelValue: computed(() => props.modelValue),
      checked: props.modelValue,
      id: props.inputId,
      required: !props.optional,
      disabled: props.disabled,
      indeterminate: props.indeterminate,
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
      hidden: !props.invalid || props.indeterminate ? true : undefined,
    })

    provideHelperTextContext({
      ref: refs.helperText,
      id: props.helperTextId,
      hidden: props.invalid || props.indeterminate ? true : undefined,
    })

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
        },
      })
  },
})
