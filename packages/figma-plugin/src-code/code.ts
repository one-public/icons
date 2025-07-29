import { listenTS, dispatchTS } from './utils/code-utils'

figma.showUI(__html__, {
  themeColors: true,
  width: 550,
  height: 600,
})

listenTS('getSelection', () => {
  const selection = figma.currentPage.selection
    .filter((item) => item.type === 'FRAME')
    .map((item) => {
      return {
        name: item.name,
        children: item.children.length,
      }
    })
  dispatchTS('getSelectionCallback', { selection })
})
