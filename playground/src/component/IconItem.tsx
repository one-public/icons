import { IconProps } from '../types'
import { createMemo, createSignal } from 'solid-js'

export default function IconItem(
  props: IconProps & { animationDelay?: number },
) {
  const [copySuccess, setCopySuccess] = createSignal(false)

  const iconSize = createMemo(() => props.size || 24)

  const displayName = createMemo(
    () => props.chineseName || props.iconName.replace('one-icons-', ''),
  )

  const handleClick = async () => {
    // 复制图标名称到剪贴板
    try {
      await navigator.clipboard.writeText(props.iconName)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 500)
    } catch (err) {
      console.error('复制失败:', err)
    }
  }

  return (
    <div
      class="icon-item group relative flex flex-col items-center justify-center p-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 cursor-pointer transition-all duration-200 hover:shadow-md hover:shadow-blue-500/10 hover:border-blue-300 dark:hover:border-blue-600 active:scale-95 w-full min-h-[50px] max-w-full overflow-hidden"
      style={{
        'animation-delay': props.animationDelay
          ? `${Math.min(props.animationDelay * 3, 100)}ms`
          : undefined,
      }}
      onClick={handleClick}
      role="button"
      tabindex="0"
      aria-label={`复制图标 ${props.iconName}`}
      title={`点击复制: ${props.iconName}`}
    >
      {/* 图标 */}
      <span
        class={`text-gray-600 dark:text-gray-300 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-200 mb-1 flex-shrink-0 ${props.iconName}`}
        style={{ 'font-size': `${iconSize()}px` }}
      ></span>

      {/* 图标名称 */}
      <div class="text-xs text-gray-500 dark:text-gray-400 text-center leading-tight w-full px-1 truncate group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-200">
        {displayName()}
      </div>

      {/* 复制成功提示 */}
      <div
        class={`absolute inset-0 bg-green-500 rounded-lg flex items-center justify-center text-white text-xs font-medium gap-1 transition-opacity duration-200 ${
          copySuccess() ? 'opacity-90' : 'opacity-0 pointer-events-none'
        }`}
      >
        <span>✓</span>
        <span>已复制</span>
      </div>
    </div>
  )
}
