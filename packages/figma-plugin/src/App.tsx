import type { Component } from "solid-js";

// 预览
// 推送
const iconCount = 13;

const App: Component = () => {
  return (
    <div class="gap-2">
      <p>共有图标<span class="text-lg color-blue">{iconCount}</span>个</p>
      <button>推送</button>
    </div>
  );
};

export default App;
