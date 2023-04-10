
import { parseColors, cleanupSVG, runSVGO } from '@iconify/tools';
import autoPackage from './autoPackage'
import figma from './figma';
import createSvgs from './createSvgs';

(async () => {

  process.env.FIGMA_FILE_LINK = 'https://www.figma.com/file/j1ppBkV96gPsfEGglJ4J7C/icons?t=BvUPG9xac1vAIeFP-6'
  process.env.FIGMA_TOKEN = 'figd_14Pn3f-bu_XuYhUTU_tNMOKQHX0WSgFxWAJYYoy7';
  
  const { result, iconTags } = await figma()
  if (result === 'not_modified') {
    // This result is possible if ifModifiedSince option is set
    console.log('figma图标 没有修改');
    return;
  }

  const iconSet = result.iconSet;
  // Check colors in icons
  await iconSet.forEach(async (name) => {
    const svg = iconSet.toSVG(name);
    if (!svg) {
      return;
    }
    // Clean up icon code
    await cleanupSVG(svg);

    await parseColors(svg, {
      // Change default color to 'currentColor'
      defaultColor: 'currentColor',
      // Callback to parse each color
      callback: (attr, colorStr) => {
        // 如果名称是 colored 结尾，就表示不修改图标颜色
        if (name.endsWith('colored')) return colorStr;
        const color = colorStr.toLowerCase()
        if (color === 'none') return colorStr;
        return 'currentColor';
      },
    });
    runSVGO(svg);
    // 设置分类 
    iconSet.toggleCategory(name, iconTags[name], true);
    // Update icon in icon set
    iconSet.fromSVG(name, svg);
  });

  await autoPackage(iconSet)
  await createSvgs(iconSet)
})();