import { For } from 'solid-js'

interface LoadingStateProps {
  count?: number
}

export default function LoadingState(props: LoadingStateProps) {
  const count = props.count || 24

  return (
    <div class="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-8 xl:grid-cols-10 2xl:grid-cols-12 gap-1.5 sm:gap-2 w-full">
      <For each={Array(count).fill(0)}>
        {(_, i) => (
          <div 
            class="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg min-h-[50px] w-full"
            style={{ 
              'animation-delay': `${i() * 50}ms`
            }}
          >
            <div class="flex flex-col items-center justify-center h-full p-1.5">
              <div class="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded mb-1"></div>
              <div class="w-8 h-2 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>
          </div>
        )}
      </For>
    </div>
  )
}
