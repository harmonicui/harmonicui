import { defineComponent, h } from 'vue'
import { useSwitchToggleContext } from '../../contexts'
import { unrefAllRefs } from '../../utils'

export default defineComponent({
  name: 'SwitchToggle',

  inheritAttrs: false,

  props: {
    as: {
      type: String,
    },
  },

  setup(props, { slots, attrs }) {
    const { ref, toggleValue, handleKeyDown, ...context } =
      useSwitchToggleContext()

    const Element = props.as ?? 'button'

    const onClick = () => {
      toggleValue()
    }

    const onKeyDown = (event: KeyboardEvent) => {
      handleKeyDown(event)
    }

    return () =>
      h(
        Element,
        {
          ...attrs,
          ref,
          onClick,
          onKeyDown,
          ...unrefAllRefs(context),
        },
        slots.default?.(),
      )
  },
})
