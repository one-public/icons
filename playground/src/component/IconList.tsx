import type { Component } from "solid-js";
import { createMemo, For } from "solid-js";
import { addCollection } from "@iconify-icon/solid";
import { icons } from "@one-public/icon-json";
import Icons from "./Icons";
import { searchValue } from "../currentValue";

addCollection(icons);

const IconList: Component = () => {
  const { value } = searchValue;
  const iconList = createMemo(() => {
    const { prefix } = icons;
    return Object.keys(icons.icons)
      .filter((key) => key.includes(value()))
      .map((key) => {
        return {
          svg: icons.icons[key].body,
          name: key,
          iconName: `${prefix}:${key}`,
          prefix,
          isColor: key.endsWith("colored"),
        };
      });
  });

  return (
    <div class="non-dragging flex flex-wrap select-none justify-center text-2xl text-dark-600 dark:text-dark-900 2xl">
      <For each={iconList()}>
        {(icon, i) => (
          <Icons
            prefix={icon.prefix}
            iconName={icon.iconName}
            name={icon.name}
            svg={icon.svg}
            isColor={icon.isColor}
          ></Icons>
        )}
      </For>
    </div>
  );
};

export default IconList;
