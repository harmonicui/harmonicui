import { defineComponent, getCurrentInstance } from 'vue'
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
    hintMessageId: {
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
    const idSequence = useId()

    function generateId (childName: string, id: number) {
      const componentName = getCurrentInstance()?.type.name
      return `HarmonicUI-${componentName}-${childName}-${id}`
    }

    const id = props.id ?? generateId('Input', idSequence)
    const labelId = props.labelId ?? generateId('Label', idSequence)
    const errorMessageId = props.errorMessageId ?? generateId('ErrorMessage', idSequence)
    const hintMessageId = props.hintMessageId ?? generateId('HintMessage', idSequence)

    function updateValue (value: string | number) {
      emit('update:modelValue', value)
    }

    provideLabelContext({
      id: labelId,
      htmlFor: id,
      optional: props.optional,
      disabled: props.disabled,
      invalid: props.error,
    })

    provideInputContext({
      id,
      updateValue,
      disabled: props.disabled,
      required: !props.optional,
      value: props.modelValue,
      ariaErrormessage: errorMessageId,
      ariaDescribedby: hintMessageId,
      invalid: props.error,
    })

    provideErrorMessageContext({
      id: errorMessageId,
      visible: props.error,
      message: props.errorMessage,
    })

    provideHelperTextContext({
      id: hintMessageId,
      visible: !props.error,
    })

    return () => {
      return slots.default?.({
        id,
        labelId,
        clear: () => { updateValue('') },
        updateValue,
        hintMessageId,
        errorMessageId,
        invalid: props.error,
        value: props.modelValue,
        disabled: props.disabled,
        optional: props.optional,
        required: !props.optional,
        errorMessage: props.errorMessage,
      })
    }
  },
})
