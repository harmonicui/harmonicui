import { defineComponent, h } from 'vue'
import { useErrorMessageContext } from '../../contexts'

export default defineComponent({
  inheritAttrs: false,

  setup (props, {
    slots,
    attrs,
  }) {
    const {
      id,
      hidden,
      message,
    } = useErrorMessageContext()

    return () => h('span', {
      ...attrs,
      id,
      hidden,
    }, slots.default ? slots.default() : message)
  },
})
