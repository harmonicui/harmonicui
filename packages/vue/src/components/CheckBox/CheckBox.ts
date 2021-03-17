import { defineComponent } from 'vue'
import useId from '../../composables/useId'
import {
  provideCheckBoxContext,
  provideLabelContext,
  provideErrorMessageContext,
  provideHelperTextContext,
} from '../../contexts'

export default defineComponent({
  name: 'CheckBox',

  props: {
    id: {
      type: String,
    },

    labelId: {
      type: String,
    },

    errorMessageId: {
      type: String,
    },

    helperTextId: {
      type: String,
    },

    optional: {
      type: Boolean,
      default: false,
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    error: {
      type: Boolean,
      default: false,
    },

    errorMessage: {
      type: String,
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
      type: String,
    },
  },

  emits: [
    'update:modelValue',
    'update:checked',
  ],

  setup (props, { slots, emit }) {
    const ID_SEQUENCE = useId()

    const IDs = {
      CheckBox: props.id ?? `HarmonicUI-CheckBox-CheckBox-${ID_SEQUENCE}`,
      label: props.labelId ?? `HarmonicUI-CheckBox-Label-${ID_SEQUENCE}`,
      errorMessage: props.errorMessageId ?? `HarmonicUI-CheckBox-ErrorMessage-${ID_SEQUENCE}`,
      helperText: props.helperTextId ?? `HarmonicUI-CheckBox-HelperText-${ID_SEQUENCE}`,
    }

    function updateValue (value: string | number) {
      emit('update:modelValue', value)
    }

    function updateChecked (checked : boolean) {
      emit('update:checked', checked)
    }

    const slotProps = {
      id: IDs.CheckBox,
      labelId: IDs.label,
      updateValue,
      updateChecked,
      errorMessageId: IDs.errorMessage,
      helperTextId: IDs.helperText,
      required: !props.optional,
      optional: props.optional,
      disabled: props.disabled,
      invalid: props.error,
      errorMessage: props.errorMessage,
      checked: props.checked,
      indeterminate: props.indeterminate,
      value: props.value,
    }

    provideCheckBoxContext({
      id: IDs.CheckBox,
      ariaErrormessage: IDs.errorMessage,
      updateValue,
      updateChecked,
      ariaDescribedby: IDs.helperText,
      required: !props.optional,
      disabled: props.disabled,
      invalid: props.error,
      checked: props.checked,
      indeterminate: props.indeterminate,
      value: props.value,
    })

    provideLabelContext({
      id: IDs.label,
      htmlFor: IDs.CheckBox,
      optional: props.optional,
      disabled: props.disabled,
      invalid: props.error,
    })

    provideErrorMessageContext({
      id: IDs.errorMessage,
      hidden: !props.error,
      message: props.errorMessage,
    })

    provideHelperTextContext({
      id: IDs.helperText,
      hidden: props.error,
    })

    return () => {
      return slots.default?.(slotProps)
    }
  },
})
