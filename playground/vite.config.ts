import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import UnocssPlugin from '@unocss/vite'
import { presetScrollbar } from 'unocss-preset-scrollbar'

export default defineConfig({
  plugins: [
    solidPlugin(),
    UnocssPlugin({
      presets: [presetScrollbar()],
    }),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
})
