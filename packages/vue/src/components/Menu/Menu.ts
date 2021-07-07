import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  onUnmounted,
  reactive,
  readonly,
  ref,
} from 'vue'
import { render } from '../../utils'
import type { MenuItemSubscription } from '../../contexts'
import {
  provideMenuButtonContext,
  provideMenuItemContext,
  provideMenuListContext,
} from '../../contexts'

export enum Items {
  First = 'First',
  Last = 'Last',
  Next = 'Next',
  Previous = 'Previous',
  Specific = 'Specific',
  None = 'None',
}

export enum Keys {
  Space = ' ',
  Enter = 'Enter',
  Escape = 'Escape',
  Backspace = 'Backspace',

  ArrowLeft = 'ArrowLeft',
  ArrowUp = 'ArrowUp',
  ArrowRight = 'ArrowRight',
  ArrowDown = 'ArrowDown',

  Home = 'Home',
  End = 'End',

  PageUp = 'PageUp',
  PageDown = 'PageDown',

  Tab = 'Tab',
}

export enum MenuState {
  Open,
  Closed,
}

export const Menu = defineComponent({
  name: 'Menu',

  inheritAttrs: false,

  props: {
    as: {
      type: [String, Object],
      default: 'fragment',
    },
  },

  setup(props, { slots, attrs }) {
    const menuListId = ref<string | null>(null)
    const menuButtonId = ref<string | null>(null)
    const menuState = ref<MenuState>(MenuState.Closed)
    const searchQuery = ref<string>('')
    const searchDebounce = ref<ReturnType<typeof setTimeout> | null>(null)

    const items = ref<Array<MenuItemSubscription>>([])
    const activeItem = ref<MenuItemSubscription | undefined>(undefined)

    function setActiveItem(item: Items.Specific, id: string): void
    function setActiveItem(item: Exclude<Items, Items.Specific>): void
    function setActiveItem(item: Items, id?: string) {
      switch (item) {
        case Items.First:
          activeItem.value = items.value.find(item => item.disabled === false)
          break

        case Items.Last:
          activeItem.value = items.value
            .slice()
            .reverse()
            .find(item => !item.disabled)
          break

        case Items.Next:
          activeItem.value =
            items.value.find((item, index) => {
              const currentIndex = items.value.findIndex(
                i => i.id === activeItem.value?.id,
              )

              return index > currentIndex && !item.disabled
            }) || activeItem.value
          break

        case Items.Previous:
          activeItem.value =
            items.value
              .slice()
              .reverse()
              .find((item, index) => {
                const currentIndex = items.value
                  .slice()
                  .reverse()
                  .findIndex(i => i.id === activeItem.value?.id)

                return index > currentIndex && !item.disabled
              }) || activeItem.value
          break

        case Items.Specific:
          activeItem.value = items.value.find(item => item.id === id)
          break

        case Items.None:
          activeItem.value = undefined
          break
      }
    }

    function clickOutsideListener(
      this: Window,
      event: WindowEventMap['mousedown'],
    ) {
      const target = event.target as HTMLElement

      if (
        menuButtonId.value &&
        document.getElementById(menuButtonId.value) === target
      ) {
        return
      }

      if (
        menuListId.value &&
        document.getElementById(menuListId.value)?.contains(target)
      ) {
        return
      }
      closeMenu()
    }

    onMounted(() => {
      window.addEventListener('mousedown', clickOutsideListener)
    })

    onUnmounted(() =>
      window.removeEventListener('mousedown', clickOutsideListener),
    )

    function menuIsOpen() {
      return menuState.value === MenuState.Open
    }

    function menuIsClosed() {
      return menuState.value === MenuState.Closed
    }

    function focusMenuButton(): void {
      if (menuButtonId.value) {
        document.getElementById(menuButtonId.value)?.focus()
      }
    }

    function focusMenuList(): void {
      if (menuListId.value) {
        document.getElementById(menuListId.value)?.focus()
      }
    }

    function openMenu(activeItem: Exclude<Items, Items.Specific>) {
      menuState.value = MenuState.Open
      setActiveItem(activeItem)
      nextTick(() => focusMenuList())
    }

    function closeMenu() {
      menuState.value = MenuState.Closed
      setActiveItem(Items.None)
      nextTick(() => focusMenuButton())
    }

    function toggleMenu(): void {
      if (menuIsOpen()) {
        closeMenu()
      } else {
        openMenu(Items.None)
      }
    }

    provideMenuButtonContext({
      subscribe: data => {
        menuButtonId.value = data.id
      },
      openMenu,
      toggleMenu,
      data: readonly(
        reactive({
          ariaControls: menuListId,
          ariaExpanded: computed(() => menuIsOpen() || undefined),
        }),
      ),
    })

    provideMenuListContext({
      subscribe: data => {
        menuListId.value = data.id
      },
      closeMenu,
      setActiveItem,
      search: (value: string) => {
        if (searchDebounce.value) {
          clearTimeout(searchDebounce.value)
        }

        searchQuery.value += value

        activeItem.value = items.value.find(
          item =>
            item.text
              .toLowerCase()
              .startsWith(searchQuery.value.toLowerCase()) && !item.disabled,
        )

        searchDebounce.value = setTimeout(() => (searchQuery.value = ''), 500)
      },
      data: readonly(
        reactive({
          isSearching: computed(() => !!searchDebounce.value),
          activeItemId: computed(() => activeItem.value?.id),
          hidden: computed(() => menuIsClosed() || undefined),
          ariaActiveDescendant: computed(() => activeItem.value?.id),
          ariaLabelledBy: menuButtonId,
        }),
      ),
    })

    provideMenuItemContext({
      subscribe: data => {
        items.value.push(data)
      },
      focus: (id: string) => {
        setActiveItem(Items.Specific, id)
      },
      unFocus: () => {
        setActiveItem(Items.None)
      },
      close: closeMenu,
    })

    return () =>
      render({
        as: props.as,
        props: attrs,
        children: slots.default,
        childrenProps: {
          isOpen: menuIsOpen(),
        },
      })
  },
})
