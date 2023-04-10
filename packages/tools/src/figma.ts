import { importFromFigma } from "@iconify/tools";
import { cacheDir, iconPrefix } from "./config";


export function getFigmaInfo() {
  const FIGMA_FILE_LINK = process.env.FIGMA_FILE_LINK
  const FIGMA_TOKEN = process.env.FIGMA_TOKEN
  if (!FIGMA_FILE_LINK)
    throw new Error(`figma 文件地址不能为空`);
  if (!FIGMA_TOKEN)
    throw new Error(`figma token 不能为空`);

  const fileId = FIGMA_FILE_LINK.match(/file\/([a-z0-9]+)\//i)?.[1] || ''
  if (!fileId)
    throw new Error(`figma 文件地址${FIGMA_FILE_LINK}中无法获取文件id`);
  return {
    fileId,
    token: FIGMA_TOKEN
  }
}


export default async function () {
  const iconTags: Record<string, string> = {}

  const { fileId, token } = getFigmaInfo()

  const result = await importFromFigma({
    prefix: iconPrefix,
    file: fileId,
    token: token,
    ifModifiedSince: true,
    cacheDir: cacheDir,
    depth: 3,
    filterParentNode: (nodes) => {
      return nodes.length === 1 && nodes[0].type === 'CANVAS'
    },
    iconNameForNode: (node) => {
      const parentName = node.parents[0].name
      iconTags[node.name] = parentName
      return node.name
    },
  });

  return {
    result,
    iconTags
  }
}