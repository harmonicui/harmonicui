import { defineComponent, h } from 'vue'
import { useCheckBoxInputContext } from '../../contexts'
import { unrefAllRefs } from '../../utils'

type InputEvent = { target: { value: string }}

export default defineComponent({
  name: 'CheckBoxInput',

  inheritAttrs: false,

  setup (props, { attrs }) {
    const {
      ref,
      setModelValue,
      id,
      indeterminate,
      ...context
    } = useCheckBoxInputContext()

    const onChange = (event: InputEvent) => {
      setModelValue(event.target.value)
    }

    return () => h('input', {
      ...attrs,
      type: 'checkbox',
      ref,
      id,
      'indeterminate.prop': indeterminate,
      onChange,
      ...unrefAllRefs(context),
    })
  },
})
