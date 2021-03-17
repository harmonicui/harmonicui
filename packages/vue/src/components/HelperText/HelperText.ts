import { defineComponent, h } from 'vue'
import { useHelperTextContext } from '../../contexts'

export default defineComponent({
  setup (props, { slots }) {
    const {
      id,
      hidden,
    } = useHelperTextContext()

    return () => h('span', {
      id,
      hidden,
    }, slots.default?.())
  },
})
