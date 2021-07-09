export function useComposeDataState(
  input: Record<string, boolean>,
): string | undefined {
  const result = Object.entries(input)
    .reduce((dataAttribute, [key, value]) => {
      if (value) {
        dataAttribute.push(key)
      }

      return dataAttribute
    }, [] as Array<string>)
    .join(' ')

  return result !== '' ? result : undefined
}
