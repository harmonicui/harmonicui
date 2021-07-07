import { defineComponent, onMounted } from 'vue'
import { render } from '../../utils'
import { useMenuItemContext } from '../../contexts'
import { useGenerateId } from '../../composable'

export const MenuItem = defineComponent({
  name: 'MenuItem',

  props: {
    as: {
      type: [String, Object],
      default: 'fragment',
    },

    id: {
      type: String,
      default: () => useGenerateId('MenuItem'),
    },

    disabled: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, { slots }) {
    const { close, subscribe, focus, unFocus } = useMenuItemContext()

    onMounted(() => {
      subscribe({
        id: props.id,
        disabled: props.disabled,
        text: document.getElementById(props.id)?.textContent || '',
      })
    })

    function onFocusHandler() {
      focus(props.id)
    }

    function onCLickHandler(event: MouseEvent) {
      if (props.disabled) {
        event.preventDefault()
        event.stopImmediatePropagation()
        return
      }

      close()
    }

    function onHoverHandler() {
      if (props.disabled) {
        return
      }

      focus(props.id)
    }

    function onUnHoverHandler() {
      if (props.disabled) {
        return
      }

      unFocus()
    }

    return () =>
      render({
        as: props.as,
        props: {
          id: props.id,
          tabindex: props.disabled ? undefined : -1,
          role: 'menuitem',
          'aria-disabled': props.disabled || undefined,
          onPointermove: onHoverHandler,
          onPointerleave: onUnHoverHandler,
          onClick: onCLickHandler,
          onFocus: onFocusHandler,
        },
        children: slots.default,
      })
  },
})
