import type { Component } from "solid-js";
import { searchValue } from "../currentValue";

const Search: Component = () => {
  let searchInputRef: HTMLInputElement;
  const { value, setValue } = searchValue;

  const onInput = (e: InputEvent) => {
    const inputValue = (e.target as HTMLInputElement).value;
    setValue(inputValue);
  };

  const cleanInputValue = () => {
    setValue("");
    searchInputRef.focus();
  };

  return (
    <div class="mx-8 my-2 hidden flex shadow rounded outline-none py-1 px-4 border border-base items-center">
      <em class="i-carbon:search opacity-60"></em>
      <input
        ref={searchInputRef}
        type="text"
        placeholder="请输入名称"
        autofocus
        autocomplete="off"
        class="text-base outline-none w-full py-1 px-4 m-0 bg-transparent"
        value={value()}
        onInput={onInput}
      />
      <em
        class="i-carbon:close opacity-60 cursor-pointer"
        onClick={cleanInputValue}
      ></em>
    </div>
  );
};

export default Search;
