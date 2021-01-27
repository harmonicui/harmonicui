import { Component, defineComponent, DefineComponent } from 'vue'
import { render, RenderResult } from '@testing-library/vue'

function renderInlineComponent (TestComponent: Partial<DefineComponent>): RenderResult {
  return render(defineComponent(TestComponent))
}

function renderComponent (
  component: Component,
  props?: Record<string, unknown>,
  defaultSlot?: string,
  components?: Record<string, Component>,
): RenderResult {
  return render(component, {
    props,
    slots: defaultSlot ? { default: defaultSlot } : undefined,
    global: { components },
  })
}

export {
  render,
  renderComponent,
  renderInlineComponent,
}
