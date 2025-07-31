import { createSignal, createEffect, onCleanup } from 'solid-js'

export function useDebounce<T>(value: () => T, delay: number) {
  const [debouncedValue, setDebouncedValue] = createSignal<T>(value())

  createEffect(() => {
    const currentValue = value() // 获取当前值，建立响应式依赖

    const timer = setTimeout(() => {
      setDebouncedValue(() => currentValue)
    }, delay)

    onCleanup(() => clearTimeout(timer))
  })

  return debouncedValue
}
