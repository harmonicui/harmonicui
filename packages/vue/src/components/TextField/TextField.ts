import { defineComponent } from 'vue'
import useId from '../../composables/useId'
import {
  provideLabelContext,
  provideInputContext,
  provideErrorMessageContext,
  provideHelperTextContext,
} from '../../contexts'

export default defineComponent({
  name: 'TextField',

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
    modelValue: {
      type: [String, Number],
      required: true,
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
      default: '',
    },
  },

  emits: [
    'update:modelValue',
  ],

  setup (props, { slots, emit }) {
    const ID_SEQUENCE = useId()

    const IDs = {
      input: props.id ?? `HarmonicUI-TextField-Input-${ID_SEQUENCE}`,
      label: props.labelId ?? `HarmonicUI-TextField-Label-${ID_SEQUENCE}`,
      errorMessage: props.errorMessageId ?? `HarmonicUI-TextField-ErrorMessage-${ID_SEQUENCE}`,
      helperText: props.helperTextId ?? `HarmonicUI-TextField-HelperText-${ID_SEQUENCE}`,
    }

    function updateValue (value: string | number) {
      emit('update:modelValue', value)
    }

    function clear () {
      updateValue('')
    }

    provideLabelContext({
      id: IDs.label,
      htmlFor: IDs.input,
      optional: props.optional,
      disabled: props.disabled,
      invalid: props.error,
    })

    provideInputContext({
      id: IDs.input,
      updateValue,
      disabled: props.disabled,
      required: !props.optional,
      value: props.modelValue,
      ariaErrormessage: IDs.errorMessage,
      ariaDescribedby: IDs.helperText,
      invalid: props.error,
    })

    provideErrorMessageContext({
      id: IDs.errorMessage,
      visible: props.error,
      message: props.errorMessage,
    })

    provideHelperTextContext({
      id: IDs.helperText,
      visible: !props.error,
    })

    const slotProps = {
      id: IDs.input,
      labelId: IDs.label,
      clear,
      updateValue,
      helperTextId: IDs.helperText,
      errorMessageId: IDs.errorMessage,
      invalid: props.error,
      value: props.modelValue,
      disabled: props.disabled,
      optional: props.optional,
      required: !props.optional,
      errorMessage: props.errorMessage,
    }

    return () => {
      return slots.default?.(slotProps)
    }
  },
})
