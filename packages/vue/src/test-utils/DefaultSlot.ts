import { defineComponent, h } from 'vue'

const DefaultSlot = jest.fn()

beforeEach(() => {
  DefaultSlot.mockClear()
  DefaultSlot.mockName('DefaultSlot')
})

const DefaultSlotComponent = defineComponent({
  props: ['slotProps'],
  setup (props) {
    DefaultSlot(props.slotProps)
    return () => h('span', {}, 'Default Slot')
  },
})

export { DefaultSlot, DefaultSlotComponent }
