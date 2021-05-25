export function useGenerateDataIsAttribute (input: Record<string, boolean>): { 'data-is': string | undefined } {
  const result = Object.entries(input).reduce((dataAttribute, [key, value]) => {
    if (value) {
      dataAttribute.push(key)
    }

    return dataAttribute
  }, [] as Array<string>).join(' ')

  return { 'data-is': result !== '' ? result : undefined }
}
