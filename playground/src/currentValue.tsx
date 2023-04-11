import { createSignal, createRoot } from "solid-js";
import { IconProps } from "./types";

function createSearchValue() {
  const [value, setValue] = createSignal("");
  return { value, setValue };
}

export const searchValue = createRoot(createSearchValue);

function createSelectIcon() {
  const [value, setValue] = createSignal<IconProps>();
  return { value, setValue };
}
export const selectIcon = createRoot(createSelectIcon);
