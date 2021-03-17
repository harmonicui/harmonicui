import { defineComponent, h } from 'vue'
import { useHelperTextContext } from '../../contexts'

export default defineComponent({
  inheritAttrs: false,

  setup (props, {
    slots,
    attrs,
  }) {
    const {
      id,
      hidden,
    } = useHelperTextContext()

    return () => h('span', {
      ...attrs,
      id,
      hidden,
    }, slots.default?.())
  },
})
