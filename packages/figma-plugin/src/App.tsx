import type { Component } from 'solid-js'
import { createSignal } from 'solid-js'
import { dispatchTS, listenTS } from './utils/emit'

const [menuIconCount, setMenuIconCount] = createSignal(0)
const [defaultIconCount, setDefaultIconCount] = createSignal(0)
const [coloredIconCount, setColoredIconCount] = createSignal(0)
dispatchTS('getSelection', null)

listenTS('getSelectionCallback', ({ selection }) => {
  selection.forEach((item) => {
    item.name.includes('menu') ? setMenuIconCount(item.children) : null
    item.name.includes('colored') ? setColoredIconCount(item.children) : null
    item.name.includes('icon') ? setDefaultIconCount(item.children) : null
  })
})




const App: Component = () => {
  return (
    <div class="gap-2">
      <p>
        共有<span class="text-lg color-blue">菜单</span>图标
        <span class="text-lg color-blue">{menuIconCount()}</span>个
      </p>
      <p>
        共有<span class="text-lg color-blue">默认</span>图标
        <span class="text-lg color-blue">{defaultIconCount()}</span>个
      </p>
      <p>
        共有<span class="text-lg color-blue">彩色</span>图标
        <span class="text-lg color-blue">{coloredIconCount()}</span>个
      </p>

      <button
        onClick={() => {
          dispatchTS('getSelection', null)
        }}
      >
        获取选择
      </button>
      <button
        onClick={() => {
          dispatchTS('getSelection', null)
        }}
      >
        发布更新
      </button>
    </div>
  )
}

export default App
