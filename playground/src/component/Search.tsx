import type { Component } from "solid-js";
import { createSignal, createEffect } from "solid-js";
import { searchValue } from "../currentValue";
import { useDebounce } from "../hooks";

const Search: Component = () => {
  let searchInputRef: HTMLInputElement;
  const { setValue } = searchValue;
  const [inputValue, setInputValue] = createSignal("");

  // 使用防抖 Hook
  const debouncedValue = useDebounce(inputValue, 300);

  // 判断是否正在搜索（输入值和防抖值不一致时）
  const isSearching = () => inputValue() !== debouncedValue();

  // 使用 createEffect 监听防抖值变化
  createEffect(() => {
    setValue(debouncedValue());
  });

  const onInput = (e: InputEvent) => {
    const newValue = (e.target as HTMLInputElement).value;
    setInputValue(newValue);
  };

  const cleanInputValue = () => {
    setInputValue("");
    setValue("");
    searchInputRef.focus();
  };

  return (
    <div class="sticky top-0 z-40 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 px-3 py-3">
      <div class="relative group max-w-2xl mx-auto">
        {/* 搜索图标/加载状态 */}
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {isSearching() ? (
            <div class="animate-spin w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
          ) : (
            <em class="i-carbon:search text-gray-400 dark:text-gray-500 group-focus-within:text-blue-500 transition-colors duration-200"></em>
          )}
        </div>

        {/* 搜索输入框 */}
        <input
          ref={searchInputRef}
          type="text"
          placeholder="搜索图标名称或中文别名..."
          autofocus
          autocomplete="off"
          class="w-full pl-10 pr-10 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg outline-none transition-all duration-200 focus:bg-white dark:focus:bg-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 placeholder-gray-400 dark:placeholder-gray-500"
          value={inputValue()}
          onInput={onInput}
        />

        {/* 右侧状态和清除按钮 */}
        {inputValue() && (
          <div class="absolute inset-y-0 right-0 pr-3 flex items-center gap-1">
            <span class="text-xs text-gray-400 dark:text-gray-500">
              {isSearching() ? '搜索中...' : '已搜索'}
            </span>
            <button
              class="p-1 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={cleanInputValue}
              aria-label="清除搜索"
            >
              <em class="i-carbon:close text-sm"></em>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
