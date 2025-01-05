import { defineConfig, defineViteConfig } from 'electron-vite'
import { resolve } from 'path'
import baseViteConfig from './vite.config'

export default defineConfig(({ mode }) => {
  if (mode === 'development') {
    // 开发环境
    return {
      main: defineViteConfig({
        resolve: {
          alias: {
            '@': resolve(__dirname, 'SCelectron'),
          },
        },
        root: resolve(__dirname, 'SCelectron'),
        build: {
          rollupOptions: {
            input: {
              index: "@/main.ts",
            },
          },
        },
      }),
      preload: defineViteConfig({
        resolve: {
          alias: {
            '@': resolve(__dirname, 'SCelectron'),
          },
        },
        root: resolve(__dirname, 'SCelectron'),
        build: {
          rollupOptions: {
            input: {
              index: '@/preload/index.ts',
            },
            output: {
              format: 'cjs',
              entryFileNames: '[name].js',
            },
          },
        },
      }),
      renderer: {
        ...baseViteConfig,
        root: resolve(__dirname),
        build: {
          rollupOptions: {
            input: {
              index: 'index.html',
            },
          },
        },
      },
    }
  } else {
    // 生产环境
    return {}
  }
})
