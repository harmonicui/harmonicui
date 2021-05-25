import { defineComponent } from 'vue'
import { render } from '../../utils'
import { useErrorMessageContext } from '../../contexts'

export default defineComponent({
  name: 'ErrorMessage',

  inheritAttrs: false,

  props: {
    as: {
      type: String,
      default: 'div',
      validator: (value: string) => {
        return ['div', 'span'].indexOf(value) !== -1
      },
    },
  },

  setup(props, { slots, attrs }) {
    const context = useErrorMessageContext()

    return () =>
      render({
        as: props.as,
        props: { ...attrs, ...context },
        children: slots.default,
      })
  },
})
