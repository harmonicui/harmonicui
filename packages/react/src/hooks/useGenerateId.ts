import { useId } from '@reach/auto-id'

export function useGenerateId (componentName: string): string {
  return `HUI-${componentName}-${useId()}`
}
