import { IconSet, exportToDirectory } from "@iconify/tools";
import { iconSvgsPath } from "./config";

export default async function (iconSet: IconSet) {
  exportToDirectory(iconSet, {
    target: iconSvgsPath
  })
  console.log(`生成的svg一共有 ${iconSet.count()} 个`);
}
