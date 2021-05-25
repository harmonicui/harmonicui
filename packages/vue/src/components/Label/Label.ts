import { defineComponent, h } from 'vue'
import { useLabelContext } from '../../contexts'
import { unrefAllRefs } from '../../utils'

export default defineComponent({
  name: 'Label',

  inheritAttrs: false,

  setup(props, { slots, attrs }) {
    const { ref, ...context } = useLabelContext()

    return () =>
      h(
        'label',
        {
          ...attrs,
          ref,
          ...unrefAllRefs(context),
        },
        slots.default?.(),
      )
  },
})
