import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import tailwindcss from '@tailwindcss/vite'
// import { viteSingleFile } from 'vite-plugin-singlefile';
// https://vite.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/pig-charge" : "/",
  plugins: [
    // viteSingleFile(),
    vue(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false // css in js
        })
      ]
    }),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  server: {
    open: true,
    port: 3000
  },
  build: {
    rollupOptions: {
      output: {
        dir:'docs',
        // 控制 JS 文件（包括入口文件和动态导入的块）
        entryFileNames: 'js/[name].js',
        chunkFileNames: 'js/[name].js',

        // 控制静态资源（CSS、图片、字体等）
        assetFileNames: ({ name }) => {
          if (/\.css$/.test(name)) {
            return 'css/[name].[ext]' // CSS 文件放到 css/ 目录
          }
          if (/\.(png|gif|svg|ico|woff2?|eot|ttf|otf)$/.test(name)) {
            return 'other/[name].[ext]' // 其他静态资源放到 other/ 目录
          }
          if (/\.(jpg|jpeg|webp)$/.test(name)) {
            return 'assets/static/imgs/[name].[ext]'
          }
          return '[name].[ext]' // 默认处理（理论上不会用到）
        }
      }
    }
  }
})
