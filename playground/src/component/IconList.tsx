import type { Component } from 'solid-js'
import CategorySidebar from './CategorySidebar'
import IconGrid from './IconGrid'
import { searchValue, iconSize } from '../currentValue'
import { useIconData } from '../hooks'

const IconList: Component = () => {
  const { value } = searchValue
  const { size } = iconSize

  // 使用自定义 Hook 获取图标数据
  const {
    categories,
    iconList,
    groupedIcons,
    getCategoryCount,
    getCategoryDisplayName,
  } = useIconData(value)

  return (
    <div class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex-1">
      {/* 侧边栏组件 */}
      <CategorySidebar
        categories={categories()}
        getCategoryCount={getCategoryCount}
        getCategoryDisplayName={getCategoryDisplayName}
      />

      {/* 主内容区域 */}
      <div class="px-3 py-3 lg:px-6 lg:py-4 pt-4 lg:ml-60">
        <IconGrid
          iconList={iconList()}
          groupedIcons={groupedIcons()}
          searchValue={value()}
          size={size()}
          getCategoryDisplayName={getCategoryDisplayName}
        />
      </div>
    </div>
  )
}

export default IconList
