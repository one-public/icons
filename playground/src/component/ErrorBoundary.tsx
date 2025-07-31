import { ErrorBoundary as SolidErrorBoundary } from 'solid-js'
import { JSX } from 'solid-js'

interface ErrorBoundaryProps {
  children: JSX.Element
  fallback?: (error: Error) => JSX.Element
}

export default function ErrorBoundary(props: ErrorBoundaryProps) {
  const defaultFallback = (error: Error) => (
    <div class="flex flex-col items-center justify-center py-20 text-red-500">
      <div class="text-6xl mb-4 opacity-50">⚠️</div>
      <h3 class="text-xl font-medium mb-2">出现错误</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
        {error.message || '未知错误'}
      </p>
      <button 
        onClick={() => window.location.reload()}
        class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        刷新页面
      </button>
    </div>
  )

  return (
    <SolidErrorBoundary fallback={props.fallback || defaultFallback}>
      {props.children}
    </SolidErrorBoundary>
  )
}
