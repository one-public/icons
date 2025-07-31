import { For } from 'solid-js'
import IconItem from './IconItem'

interface IconData {
  iconName: string
  chineseName: string
  key: string
}

interface IconGroup {
  category: string
  icons: IconData[]
}

interface IconGridProps {
  iconList: IconData[]
  groupedIcons: IconGroup[]
  searchValue: string
  size: number
  getCategoryDisplayName: (cat: string) => string
}

export default function IconGrid(props: IconGridProps) {
  // 提取公共的网格样式
  const gridClasses =
    'grid grid-cols-5 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-8 xl:grid-cols-10 2xl:grid-cols-12 gap-1.5 sm:gap-2 w-full'

  // 渲染单个分组的空状态
  const GroupEmptyState = () => (
    <div class="flex items-center text-gray-400 dark:text-gray-500 py-3 px-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
      <span class="text-sm opacity-70 mr-2">•</span>
      <p class="text-sm">暂无匹配的图标</p>
    </div>
  )

  // 渲染分组（统一处理所有情况）
  const GroupedIcons = () => (
    <For each={props.groupedIcons}>
      {(group) => (
        <div
          class={[group.icons.length > 0 ? 'mb-6' : 'mb-3'].join(' ')}
          id={`category-${group.category}`}
        >
          {/* 分组标题 */}
          <h3
            class={`text-lg font-bold text-gray-800 dark:text-gray-200 scroll-mt-32 ${
              group.icons.length > 0
                ? 'mb-4 pb-3 border-b border-gray-200 dark:border-gray-700'
                : 'mb-2'
            }`}
          >
            {props.getCategoryDisplayName(group.category)} ({group.icons.length}
            )
          </h3>

          {/* 分组内容：图标或空状态 */}
          {group.icons.length > 0 ? (
            <div class={gridClasses}>
              <For each={group.icons}>
                {(icon, i) => (
                  <IconItem
                    iconName={icon.iconName}
                    chineseName={icon.chineseName}
                    size={props.size}
                    animationDelay={i()}
                  />
                )}
              </For>
            </div>
          ) : (
            <GroupEmptyState />
          )}
        </div>
      )}
    </For>
  )

  return (
    <div class="max-w-full">
      {/* 统一使用分组显示 */}
      <GroupedIcons />
    </div>
  )
}
