import { Component, defineComponent, DefineComponent } from 'vue'
import { render, RenderResult } from '@testing-library/vue'

type ComponentList = Record<string, Component>
type Renderer = (template: string | Partial<DefineComponent>) => RenderResult

export function createRenderer(components: ComponentList): Renderer {
  return function (template: string | Partial<DefineComponent>): RenderResult {
    if (typeof template === 'string') {
      return render(
        defineComponent({
          template: template,
          components,
        }),
      )
    }

    return render(defineComponent({ components, ...template }))
  }
}
