import { Icon } from "@iconify-icon/solid";
import { IconProps } from "../types";
import { selectIcon } from "../currentValue";

export default function (props: IconProps) {
  const { setValue } = selectIcon;
  const onClick = () => {
    setValue({ ...props });
  };

  return (
    <div class="non-dragging icons-item flex tooltip m-2" onClick={onClick}>
      <Icon icon={props.iconName}></Icon>
      <span class="b-1 border-color tooltip-text bg-base shadow leading-none whitespace-nowrap z-100">
        {props.name}
      </span>
    </div>
  );
}
