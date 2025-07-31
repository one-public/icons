import { createMemo } from 'solid-js'
import iconAlias from '@one-public/icons/iconAlias.json'
import iconJson from '@one-public/icons/icons.json'
import metadata from '@one-public/icons/metadata.json'

export interface IconData {
  iconName: string
  chineseName: string
  key: string
}

export interface IconGroup {
  category: string
  icons: IconData[]
}

export function useIconData(searchValue: () => string) {
  // 获取所有分类（去除"全部"分类）
  const categories = createMemo(() => {
    return Object.keys(metadata.categories)
  })

  // 获取所有图标的基础列表（用于计算总数）
  const allIconsList = createMemo(() => {
    return Object.keys(iconAlias).map((key) => ({
      iconName: `${iconJson.prefix}-${key}`,
      chineseName: iconAlias[key as keyof typeof iconAlias],
      key
    }))
  })

  // 图标过滤函数
  const filterIcon = (icon: IconData, searchTerm: string) => {
    if (!searchTerm) return true

    const iconName = icon.iconName.toLowerCase()
    const chineseName = icon.chineseName.toLowerCase()
    const key = icon.key.toLowerCase()
    const term = searchTerm.toLowerCase()

    return key.includes(term) || chineseName.includes(term) || iconName.includes(term)
  }

  // 获取每个分类的图标数量（基于当前搜索结果）
  const getCategoryCount = (cat: string) => {
    const searchTerm = searchValue()

    // 基于当前搜索条件计算数量
    return allIconsList()
      .filter(icon =>
        metadata.categories[cat as keyof typeof metadata.categories]?.includes(icon.key)
      )
      .filter(icon => filterIcon(icon, searchTerm))
      .length
  }

  // 按分类分组图标（统一处理搜索和分类过滤）
  const groupedIcons = createMemo(() => {
    const searchTerm = searchValue()

    // 按分类分组所有图标（应用搜索过滤）
    const groups: IconGroup[] = []

    categories().forEach(cat => {
      const categoryIcons = allIconsList()
        .filter(icon =>
          metadata.categories[cat as keyof typeof metadata.categories]?.includes(icon.key)
        )
        .filter(icon => filterIcon(icon, searchTerm))

      // 始终添加分组，即使没有图标（保持锚点元素存在）
      groups.push({ category: cat, icons: categoryIcons })
    })

    return groups
  })

  // 计算过滤后的图标总数（从分组中计算）
  const iconList = createMemo(() => {
    return groupedIcons().reduce((acc, group) => acc.concat(group.icons), [] as IconData[])
  })

  // 分类显示名称
  const getCategoryDisplayName = (cat: string) => {
    switch (cat) {
      case 'search': return '搜索结果'
      case 'icon': return '图标'
      case 'colored': return '彩色图标'
      case 'menu': return '菜单'
      default: return cat
    }
  }

  return {
    categories,
    allIconsList,
    iconList,
    groupedIcons,
    getCategoryCount,
    getCategoryDisplayName
  }
}
