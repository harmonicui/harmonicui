import { defineComponent, h } from 'vue'
import { useTextFieldInputContext } from '../../contexts'
import { unrefAllRefs } from '../../utils'

type InputEvent = { target: { value: string } }

export default defineComponent({
  name: 'TextFieldInput',

  inheritAttrs: false,

  setup(props, { attrs }) {
    const { ref, setValue, ...context } = useTextFieldInputContext()

    const onInput = (event: InputEvent) => {
      setValue(event.target.value)
    }

    return () =>
      h('input', {
        ...attrs,
        ref,
        onInput,
        ...unrefAllRefs(context),
      })
  },
})
