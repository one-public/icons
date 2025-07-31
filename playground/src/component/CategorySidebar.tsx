import { For, Show, createSignal, onMount, onCleanup } from 'solid-js'
import { iconSize } from '../currentValue'

interface CategorySidebarProps {
  categories: string[]
  getCategoryCount: (cat: string) => number
  getCategoryDisplayName: (cat: string) => string
}

export default function CategorySidebar(props: CategorySidebarProps) {
  const { size } = iconSize
  const [sidebarOpen, setSidebarOpen] = createSignal(false)
  const [showBackToTop, setShowBackToTop] = createSignal(false)

  let firstCategoryTop = 0
  let contentEle: HTMLDivElement

  // 监听滚动事件
  onMount(() => {
    let ticking = false
    contentEle = document.querySelector('#content')
    firstCategoryTop =
      document.getElementById(`category-${props.categories[0]}`)?.offsetTop || 0

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setShowBackToTop(contentEle.scrollTop > 200)
          ticking = false
        })
        ticking = true
      }
    }

    // 初始检查
    setShowBackToTop(contentEle.scrollTop > 200)

    contentEle.addEventListener('scroll', handleScroll)
    onCleanup(() => contentEle.removeEventListener('scroll', handleScroll))
  })

  const handleCategoryClick = (cat: string) => {
    const element = document.getElementById(`category-${cat}`)
    if (!element) return
    const { top } = element.getBoundingClientRect()
    scrollTo(top - firstCategoryTop)

    // 移动端点击后关闭侧边栏
    if (window.innerWidth < 1024) {
      setSidebarOpen(false)
    }
  }

  const scrollTo = (top = 0) => {
    contentEle.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <>
      {/* 移动端侧边栏触发按钮 */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen())}
        class="fixed top-20 left-4 lg:hidden w-10 h-10 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-lg shadow-lg flex items-center justify-center z-50 transition-all hover:scale-105"
        title="打开筛选"
      >
        <span class="i-carbon:filter text-lg text-gray-600 dark:text-gray-300"></span>
      </button>

      {/* 移动端遮罩层 */}
      <Show when={sidebarOpen()}>
        <div
          class="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      </Show>

      {/* 统一侧边栏控制面板 */}
      <div
        class={`fixed left-4 top-20 w-56 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-xl shadow-xl p-4 sidebar-scrollbar overflow-y-auto max-h-[calc(100vh-6rem)] z-40 sidebar-float transition-all ${
          sidebarOpen()
            ? 'translate-x-0 opacity-100'
            : 'lg:translate-x-0 lg:opacity-100 -translate-x-full opacity-0'
        }`}
      >
        {/* 移动端关闭按钮 */}
        <button
          onClick={() => setSidebarOpen(false)}
          class="lg:hidden absolute top-3 right-3 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          title="关闭"
        >
          <span class="i-carbon:close text-sm"></span>
        </button>

        {/* 总图标数量显示 */}
        <div class="mb-6 text-center">
          <p class="text-lg font-bold text-gray-800 dark:text-gray-200">
            {props.categories.reduce(
              (total, cat) => total + props.getCategoryCount(cat),
              0,
            )}{' '}
            个图标
          </p>
        </div>

        {/* 分类选择器 */}
        <div class="mb-5">
          <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            分类浏览
          </h3>
          <div class="space-y-1">
            <For each={props.categories}>
              {(cat) => (
                <button
                  class="group w-full text-left px-2 py-2 text-sm transition-all flex items-center justify-between text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  onClick={() => handleCategoryClick(cat)}
                >
                  <span class="font-medium">
                    {props.getCategoryDisplayName(cat)}
                  </span>
                  <span class="text-xs text-gray-500 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400">
                    {props.getCategoryCount(cat)}
                  </span>
                </button>
              )}
            </For>
          </div>
        </div>

        {/* 图标大小控制 */}
        <div class="mb-5 mt-2">
          <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            大小
          </h3>
          <div class="space-y-3">
            <div class="relative">
              <input
                type="range"
                min="12"
                max="50"
                step="2"
                value={size()}
                onInput={(e) => iconSize.setSize(parseInt(e.target.value))}
                class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
            <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>12px</span>
              <span class="font-medium text-blue-600 dark:text-blue-400">
                {size()}px
              </span>
              <span>50px</span>
            </div>
          </div>
        </div>
      </div>

      {/* 浮动回到顶部按钮 */}
      <Show when={showBackToTop()}>
        <button
          onClick={() => scrollTo()}
          class="fixed bottom-6 right-6 w-12 h-12 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center z-50 back-to-top hover:scale-110 active:scale-95"
          title="回到顶部"
        >
          <span class="i-carbon:arrow-up text-lg"></span>
        </button>
      </Show>
    </>
  )
}
