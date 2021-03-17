import { defineComponent, h } from 'vue'
import { useLabelContext } from '../../contexts'

export default defineComponent({
  setup (props, { slots }) {
    const {
      id,
      htmlFor,
    } = useLabelContext()

    return () => h('label', {
      id,
      for: htmlFor,
    }, slots.default?.())
  },
})
