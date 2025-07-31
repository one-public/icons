import type { Component } from 'solid-js'
import Search from './component/Search'
import IconList from './component/IconList'
import ErrorBoundary from './component/ErrorBoundary'

const App: Component = () => {
  return (
    <ErrorBoundary>
      <div class="flex flex-col h-screen scrollbar" id="content">
        <Search />
        <IconList />
      </div>
    </ErrorBoundary>
  )
}

export default App
