import { defineComponent, h } from 'vue'
import { useInputContext } from '../../contexts'

type InputEvent = { target: { value: string } }

export default defineComponent({
  inheritAttrs: false,

  setup (props, { attrs }) {
    const {
      setValue,
      ...restOfContextData
    } = useInputContext()

    return () => h('input', {
      ...attrs,
      ...restOfContextData,
      onInput: (event: InputEvent) => setValue?.(event.target.value),
    })
  },
})
