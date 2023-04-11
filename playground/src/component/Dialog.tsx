import { Icon } from "@iconify-icon/solid";
import { selectIcon } from "../currentValue";
import { Show, createMemo, createSignal } from "solid-js";

export default function () {
  const { value, setValue } = selectIcon;

  const [copyState, setCopyState] = createSignal(false);

  const [colorValue, setColorValue] = createSignal("black");

  const isShow = createMemo(() => value() && Object.keys(value()).length > 0);

  const hideDialog = () => setValue(undefined);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(value().iconName);
      setCopyState(true);
      setTimeout(() => {
        setCopyState(false);
      }, 3000);
    } catch (err) {}
  };
  const onColorChange = (e) => {
    setColorValue(e.target.value);
  };

  return (
    <Show when={isShow()}>
      <div class="fixed top-0 right-0 bottom-0 left-0 z-40">
        <div class="bg-white bottom-0 left-0 right-0 top-0 absolute transition-opacity duration-500 ease-out opacity-85"></div>

        <div class="absolute bottom-50% left-50% translate-x--50% translate-y--50% transition-all">
          <div class="p-2 flex flex-col text-left relative items-center">
            <div class="relative inline-block" style={{ color: colorValue() }}>
              <Icon icon={value().iconName} width="100px" height="100px"></Icon>
              <Show when={!value().isColor}>
                <input
                  type="color"
                  value={colorValue()}
                  onInput={onColorChange}
                  class="absolute top-0 bottom-0 left-0 right-0 opacity-0 w-full h-full cursor-pointer z-10"
                />
              </Show>
            </div>
            <div class="mt-3 text-lg flex items-center">
              <span>{value().iconName}</span>
              <em
                class="i-carbon:copy opacity-60 cursor-pointer ml-3"
                onClick={onCopy}
              ></em>
            </div>
            <Show when={value().isColor}>
              <span class="flex mt-2 ">
                以<pre> colored </pre> 结尾无法修改颜色
              </span>
            </Show>
          </div>
        </div>
        <div class="absolute right-10 top-10">
          <em
            class="i-carbon:close opacity-60 cursor-pointer w-10 h-10"
            onclick={hideDialog}
          ></em>
        </div>
        <Show when={copyState()}>
          <div class="color-green absolute bottom-50% left-50% translate--50% op-60">
            复制成功 <em class="i-carbon:checkmark"></em>
          </div>
        </Show>
      </div>
    </Show>
  );
}
