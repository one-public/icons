import { importFromFigma } from '@iconify/tools'
import { pinyin } from 'pinyin-pro'
import { cacheDir, iconPrefix } from './config'

export function getFigmaInfo() {
  const FIGMA_FILE_LINK = process.env.FIGMA_FILE_LINK
  const FIGMA_TOKEN = process.env.FIGMA_TOKEN
  if (!FIGMA_FILE_LINK) throw new Error(`figma 文件地址不能为空`)
  if (!FIGMA_TOKEN) throw new Error(`figma token 不能为空`)

  const fileId = FIGMA_FILE_LINK.match(/design\/([a-z0-9]+)\//i)?.[1] || ''
  if (!fileId)
    throw new Error(`figma 文件地址${FIGMA_FILE_LINK}中无法获取文件id`)
  return {
    fileId,
    token: FIGMA_TOKEN,
  }
}

export default async function () {
  const iconTags: Record<string, string> = {}
  const iconAlias: Record<string, string> = {}

  const { fileId, token } = getFigmaInfo()

  const result = await importFromFigma({
    prefix: iconPrefix,
    file: fileId,
    token: token,
    ifModifiedSince: '3',
    cacheDir: cacheDir,
    depth: 3,
    iconNameForNode: ({ parents, name }) => {
      const parentName = parents[0].name
      const iconName = /[\u4e00-\u9fa5]/.test(name)
        ? pinyin(name, {
            pattern: 'first',
            toneType: 'none',
            separator: '',
          }).toLocaleLowerCase()
        : name.toLocaleLowerCase()
      iconAlias[iconName] = name
      iconTags[iconName] = parentName
      return iconName
    },
  })

  return {
    result,
    iconTags,
    iconAlias,
  }
}
