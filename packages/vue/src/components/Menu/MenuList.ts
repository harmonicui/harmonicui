import { defineComponent, onMounted } from 'vue'
import { render } from '../../utils'
import { useMenuListContext } from '../../contexts'
import { useGenerateId } from '../../composable'
import { Items, Keys } from './Menu'

export const MenuList = defineComponent({
  name: 'MenuList',

  props: {
    as: {
      type: String,
      default: 'div',
      validator: (value: string) => {
        return ['div', 'ul'].indexOf(value) !== -1
      },
    },

    id: {
      type: String,
      default: () => useGenerateId('MenuList'),
    },
  },

  setup(props, { slots }) {
    const { closeMenu, subscribe, search, setActiveItem, data } =
      useMenuListContext()

    onMounted(() => {
      subscribe({
        id: props.id,
      })
    })

    function handleOnKeyDown(event: KeyboardEvent) {
      switch (event.key) {
        case Keys.Escape:
          event.preventDefault()
          closeMenu()
          break

        case Keys.Space:
          if (data.isSearching) {
            event.preventDefault()
            event.stopPropagation()
            return search(event.key)
          }
        // eslint-disable-next-line no-fallthrough
        case Keys.Enter:
          event.preventDefault()
          if (data.activeItemId) {
            document.getElementById(data.activeItemId)?.click()
          }
          closeMenu()
          break

        case Keys.ArrowDown:
          event.preventDefault()
          setActiveItem(Items.Next)
          break

        case Keys.ArrowUp:
          event.preventDefault()
          setActiveItem(Items.Previous)
          break

        case Keys.End:
        case Keys.PageDown:
          event.preventDefault()
          setActiveItem(Items.Last)
          break

        case Keys.Home:
        case Keys.PageUp:
          event.preventDefault()
          setActiveItem(Items.First)
          break

        default:
          event.preventDefault()
          search(event.key)
      }
    }

    return () =>
      render({
        as: props.as,
        props: {
          id: props.id,
          role: 'menu',
          tabindex: -1,
          'aria-labelledby': data.ariaLabelledBy,
          'aria-activedescendant': data.ariaActiveDescendant,
          hidden: data.hidden,
          onKeyDown: handleOnKeyDown,
        },
        children: slots.default,
      })
  },
})
