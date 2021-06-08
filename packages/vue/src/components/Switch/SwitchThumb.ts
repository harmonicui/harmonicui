import { defineComponent, h } from 'vue'
import { useSwitchThumbContext } from '../../contexts'
import { unrefAllRefs } from '../../utils'

export default defineComponent({
  name: 'Thumb',

  inheritAttrs: false,

  props: {
    as: {
      type: String,
    },
  },

  setup(props, { slots, attrs }) {
    const { ...context } = useSwitchThumbContext()

    const Element = props.as ?? 'span'

    return () =>
      h(
        Element,
        {
          ...attrs,
          ...unrefAllRefs(context),
        },
        slots.default?.(),
      )
  },
})
