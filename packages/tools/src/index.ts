import { parseColors, cleanupSVG, runSVGO } from '@iconify/tools'
import { encodeSvgForCss } from '@iconify/utils'
import autoPackage from './autoPackage'
import figma from './figma'
import { iconPrefix } from './config'
;(async () => {
  const { result, iconTags, iconAlias } = await figma()
  if (result === 'not_modified') {
    console.log('figma图标 没有修改')
    return
  }
  let css = `
  /** 此文件是自动生成 */
  `
  const iconSet = result.iconSet
  await iconSet.forEach(async (name) => {
    const svg = iconSet.toSVG(name)
    if (!svg) {
      return
    }
    cleanupSVG(svg)

    parseColors(svg, {
      // Change default color to 'currentColor'
      defaultColor: 'currentColor',
      // Callback to parse each color
      callback: (attr, colorStr) => {
        // 如果名称是 colored 结尾，就表示不修改图标颜色
        if (iconTags[name] === 'colored') return colorStr
        const color = colorStr.toLowerCase()
        if (color === 'none') return colorStr
        return 'currentColor'
      },
    })
    runSVGO(svg)
    iconSet.toggleCategory(name, iconTags[name], true)
    iconSet.fromSVG(name, svg)

    const dataUri = `data:image/svg+xml;utf8,${encodeSvgForCss(svg.toString())}`
    const cssVar = `--icon: url("${dataUri}");`
    const cssName = `${iconPrefix}-${name}`
    let cssContent = `
  .${cssName} {
    ${cssVar}
    mask: var(--icon) no-repeat;
    mask-size: 100% 100%;
    -webkit-mask: var(--icon) no-repeat;
    -webkit-mask-size: 100% 100%;
    background-color: currentColor;
    display: inline-block;
    width: 1em;
    height: 1em;
    font-size: 1em;
  }
`
    if (iconTags[name] === 'colored') {
      cssContent = `
      .${cssName} {
        ${cssVar}
        background: var(--icon) no-repeat;
        background-size: 100% 100%;
        background-color: transparent;
        display: inline-block;
        width: 1em;
        height: 1em;
        font-size: 1em;
      }
    `
    }
    css += cssContent
  })

  await autoPackage(iconSet, {
    customFiles: {
      'index.css': css,
      'iconAlias.json': JSON.stringify(iconAlias, null, 2),
    },
  })
})()
