import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import { createHtmlPlugin } from "vite-plugin-html";
import globalStyle from '@originjs/vite-plugin-global-style'
// https://vitejs.dev/config/
export default ({mode})=>{
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    // optimizeDeps:{
    //   exclude:[],
    //   entries:''
    // },
    build:{
      outDir: 'dist',//Specify the output directory (relative to project root).
    },
    resolve: {
      alias: {
        '@':path.resolve(__dirname,'src'),
      }
    },
    base:'./',
    publicDir:'public',
    plugins: [
        vue({
          babel:{
            plugins: [
              "@babel/plugin-proposal-optional-chaining",
              "@babel/plugin-proposal-nullish-coalescing-operator",
            ]
          }
        }),
      Components({
        resolvers: [VantResolver()]
      }),
      createHtmlPlugin({
        minify: true,
        enter:'src/main.js',
        template: 'public/index.html',
        inject: {
          data:{
            title:'vite app',
            injectScripts: `<script src="./inject.js"></script>`
          }
        }
      }),
    ],
    css:{
      preprocessorOptions: {
        scss: {
          // 此处修改为要被预处理的scss文件地址
          additionalData: `@import "@/style/global-styles.scss";`
        },
      }
    },
    server:{
      hmr:true,
      host:'localhost',
      port:3001,
      open:true,
      strictPort: false,
      https: false,
      proxy:{
        // '/api':{
        //   target:import.meta.env.VITE_BASE_URL,
        //   changeOrigin: true,
        //   rewrite: path => path.replace(/^\/api/, '')
        // }
      }
    }
  })
}
