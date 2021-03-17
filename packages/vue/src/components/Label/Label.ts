import { defineComponent, h } from 'vue'
import { useLabelContext } from '../../contexts'

export default defineComponent({
  inheritAttrs: false,

  setup (props, {
    slots,
    attrs,
  }) {
    const {
      id,
      htmlFor,
    } = useLabelContext()

    return () => h('label', {
      ...attrs,
      id,
      for: htmlFor,
    }, slots.default?.())
  },
})
