import { defineConfig, presetUno, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
      },
      collections: {
        carbon: () => import('@iconify-json/carbon').then(i => i.icons),
      }
    })],
});
