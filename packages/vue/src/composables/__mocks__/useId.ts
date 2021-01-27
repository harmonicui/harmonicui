let id = 0

beforeEach(() => {
  id = 0
})

export default function useId (): number {
  return ++id
}
