import { defineComponent, onMounted } from 'vue'
import { render } from '../../utils'
import { useMenuButtonContext } from '../../contexts'
import { useGenerateId } from '../../composable'
import { Items, Keys } from './Menu'

export const MenuButton = defineComponent({
  name: 'MenuButton',

  props: {
    as: {
      type: String,
      default: 'button',
      validator: (value: string) => {
        return ['span', 'button'].indexOf(value) !== -1
      },
    },

    id: {
      type: String,
      default: () => useGenerateId('MenuButton'),
    },

    disabled: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, { slots }) {
    const { data, openMenu, subscribe, toggleMenu } = useMenuButtonContext()

    onMounted(() => {
      subscribe({
        id: props.id,
      })
    })

    function handleClick() {
      if (props.disabled) return
      toggleMenu()
    }

    function handleOnKeyDown(event: KeyboardEvent) {
      switch (event.key) {
        case Keys.Space:
        case Keys.Enter:
        case Keys.ArrowDown:
          event.preventDefault()
          openMenu(Items.First)
          break

        case Keys.ArrowUp:
          event.preventDefault()
          openMenu(Items.Last)
          break
      }
    }

    return () =>
      render({
        as: props.as,
        props: {
          id: props.id,
          disabled: props.disabled,
          role: 'button',
          'aria-haspopup': 'menu',
          'aria-controls': data.ariaControls,
          'aria-expanded': data.ariaExpanded,
          onKeyDown: handleOnKeyDown,
          onClick: handleClick,
        },
        children: slots.default,
      })
  },
})