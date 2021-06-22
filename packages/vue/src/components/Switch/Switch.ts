import { computed, defineComponent, ref } from 'vue'
import { useGenerateDataIsAttribute, useGenerateId } from '../../composable'
import { render } from '../../utils'
import {
  HelperTextContract,
  LabelContract,
  SwitchToggleContract,
  provideHelperTextContext,
  provideLabelContext,
  provideSwitchToggleContext,
  provideSwitchThumbContext,
} from '../../contexts'

export default defineComponent({
  name: 'Switch',

  inheritAttrs: false,

  props: {
    as: {
      type: String,
      default: 'fragment',
      validator: (value: string) => {
        return ['div', 'fragment'].indexOf(value) !== -1
      },
    },

    toggleId: {
      type: String,
      default: () => useGenerateId('SwitchToggle'),
    },

    labelId: {
      type: String,
      default: () => useGenerateId('SwitchLabel'),
    },

    helperTextId: {
      type: String,
      default: () => useGenerateId('SwitchHelperText'),
    },

    value: {
      type: String,
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    modelValue: {
      type: Boolean,
    },
  },

  emits: ['update:modelValue'],

  setup(props, { slots, emit, attrs }) {
    const refs = {
      toggle: ref<SwitchToggleContract['ref']['value']>(null),
      label: ref<LabelContract['ref']['value']>(null),
      helperText: ref<HelperTextContract['ref']['value']>(null),
    }

    function toggleValue() {
      emit('update:modelValue', !props.modelValue)
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Space' && !props.disabled) {
        toggleValue()
      }
    }

    provideSwitchToggleContext({
      toggleValue,
      onKeyDown,
      ref: refs.toggle,
      id: props.toggleId,
      tabindex: '0',
      role: 'switch',
      disabled: props.disabled,
      value: props.value,
      modelValue: computed(() => props.modelValue),
      'aria-describedby': computed(() => {
        return refs.helperText.value ? props.helperTextId : undefined
      }),
      'aria-checked': computed(() => props.modelValue),
      'aria-labelledby': computed(() => props.labelId),
    })

    provideLabelContext({
      ref: refs.label,
      id: props.labelId,
      for: computed(() => undefined),
      ...useGenerateDataIsAttribute({
        disabled: props.disabled,
        on: props.modelValue,
      }),
    })

    provideHelperTextContext({
      ref: refs.helperText,
      id: props.helperTextId,
      hidden: undefined,
    })

    provideSwitchThumbContext({
      tabindex: '-1',
      ...useGenerateDataIsAttribute({
        disabled: props.disabled,
        on: props.modelValue,
      }),
    })

    return () =>
      render({
        as: props.as,
        props: attrs,
        children: slots.default,
        childrenProps: {
          disabled: props.disabled,
        },
      })
  },
})
