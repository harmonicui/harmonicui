import { defineComponent, DefineComponent } from 'vue'
import { render, RenderResult } from '@testing-library/vue'

type RenderOptions = Parameters<typeof render>[1]

function renderInlineComponent(
  TestComponent: Partial<DefineComponent>,
  options?: RenderOptions,
): RenderResult {
  return render(defineComponent(TestComponent), options)
}

export { render, renderInlineComponent }
