let id = 0

export function useGenerateId (componentName: string): string {
  return `HUI-${componentName}-${++id}`
}
