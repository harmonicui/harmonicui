import { Ref, unref } from 'vue'

export function unrefAllRefs<T>(source: T): {
  [p: string]: unknown extends Ref<infer V> ? V : unknown
} {
  return Object.entries(source).reduce((output, [key, value]) => {
    return { ...output, ...{ [key]: unref(value) } }
  }, {})
}
