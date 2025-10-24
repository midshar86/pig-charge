import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import tailwindcss from '@tailwindcss/vite'
// import { viteSingleFile } from 'vite-plugin-singlefile';
// https://vite.dev/config/
export default defineConfig({
  // base:'./',
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
        // manualChunks: undefined, // 禁用代码分割
        dir:'docs'
      },
    },
  },
})
