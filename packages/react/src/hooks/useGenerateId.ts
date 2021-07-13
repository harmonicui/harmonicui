import { useEffect, useState } from 'react'

let id = 0

function generateId() {
  return ++id
}

function useId() {
  const [id, setId] = useState(generateId)

  useEffect(() => {
    if (id === null) setId(generateId())
  }, [id])

  return id
}

export function useGenerateId(componentName: string): string {
  return `HUI-${componentName}-${useId()}`
}
