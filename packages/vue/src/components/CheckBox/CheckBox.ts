import { defineComponent, ref, computed } from 'vue'
import { useGenerateDataIsAttribute, useGenerateId } from '../../composable'
import { render, unrefAllRefs } from '../../utils'
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

    checked: {
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
      type: [String, Array],
    },
  },

  emits: ['update:modelValue'],

  setup (props, { slots, emit, attrs }) {
    const refs = {
      input: ref<CheckBoxInputContract['ref']['value']>(null),
      label: ref<LabelContract['ref']['value']>(null),
      helperText: ref<HelperTextContract['ref']['value']>(null),
      errorMessage: ref<ErrorMessageContract['ref']['value']>(null),
    }

    const checked = ref<boolean>(props.checked)

    function isChecked () {
      return checked.value
    }

    function emitOnOrOff () {
      if (props.modelValue instanceof Array) {
        props.modelValue.splice(props.modelValue.indexOf('on'), 1)
        props.modelValue.splice(props.modelValue.indexOf('off'), 1)

        isChecked() ? props.modelValue.push('on') : props.modelValue?.push('off')
        emit('update:modelValue', props.modelValue)
      } else isChecked() ? emit('update:modelValue', 'on') : emit('update:modelValue', 'off')
    }

    function emitValue (value : string) {
      if (props.modelValue instanceof Array) {
        isChecked()
          ? props.modelValue?.push(value)
          : props.modelValue?.splice(props.modelValue.indexOf(value), 1)
        emit('update:modelValue', props.modelValue)
      } else emit('update:modelValue', value)
    }

    function setModelValue (value: string) {
      checked.value = !checked.value
      value ? emitValue(value) : emitOnOrOff()
    }

    const inputProps = {
      id: props.inputId,
      required: !props.optional,
      disabled: props.disabled,
      checked: props.checked,
      indeterminate: props.indeterminate,
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

    provideCheckBoxInputContext({
      ref: refs.input,
      value: props.value,
      modelValue: props.modelValue,
      setModelValue,
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
          value: props.value,
          modelValue: props.modelValue,
          'indeterminate.prop': props.indeterminate,
          onChange: (event: { target: { value: string } }) => setModelValue(event.target.value),
          ...unrefAllRefs(inputProps),
        },

        labelProps: { ref: refs.label, ...unrefAllRefs(labelProps) },
        errorMessageProps: { ref: refs.errorMessage, ...unrefAllRefs(errorMessageProps) },
        helperTextProps: { ref: refs.helperText, ...unrefAllRefs(helperTextProps) },

        required: !props.optional,
        disabled: props.disabled,
        invalid: props.invalid,
        optional: props.optional,
        checked: props.checked,
        indeterminate: props.indeterminate,

        isChecked,
      },
    })
  },
})
