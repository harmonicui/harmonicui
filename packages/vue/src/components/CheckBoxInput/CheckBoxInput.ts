import { defineComponent, h } from 'vue'
import { useCheckBoxInputContext } from '../../contexts'
import { unrefAllRefs } from '../../utils'

export default defineComponent({
  name: 'CheckBoxInput',

  inheritAttrs: false,

  setup(props, { attrs }) {
    const { ref, indeterminate, toggleValue, ...context } =
      useCheckBoxInputContext()

    const onChange = () => {
      toggleValue()
    }

    return () =>
      h('input', {
        ...attrs,
        type: 'checkbox',
        ref,
        'indeterminate.prop': indeterminate,
        onChange,
        ...unrefAllRefs(context),
      })
  },
})
