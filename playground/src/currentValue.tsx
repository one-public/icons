import { createSignal, createRoot } from "solid-js";

function createSearchValue() {
  const [value, setValue] = createSignal("");
  return { value, setValue };
}

export const searchValue = createRoot(createSearchValue);


function createIconSize() {
  const [size, setSize] = createSignal(12); // 默认12px
  return { size, setSize };
}
export const iconSize = createRoot(createIconSize);
