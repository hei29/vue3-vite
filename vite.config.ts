import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';


// https://vitejs.dev/config/
export default defineConfig({
  // 插件
  plugins: [
      vue({
        script: {
          refSugar: true
        }
      })
  ],
  // 静态文件资源服务文件夹
  publicDir: 'public',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      "assets": path.resolve(__dirname, 'src/assets')
    }
  },
  build: {
    target: 'es2015',
    outDir: 'dist'
    // assetsDir: 'public', // 指定静态资源存放路径
    // sourcemap: false, // 是否构建source map文件
    // emptyOutDir: true, // 执行打包操作时，清空之前生产包(默认为true)
    // terserOptions: {
    //   // 生产环境移除console
    //   compress: {
    //     drop_console: true,
    //     drop_debugger: true
    //   }
    // }
  },
  server: {
    https: false, // 是否启用https
    open: true, // 是否自动在浏览器打开
    port: 4043, // 端口号
    strictPort: false, // 为true时端口已被占用则会直接退出，而不是尝试下一个可用端口。
    host: '0.0.0.0', // 监听所有地址
    proxy: {
      '/tj-gx': {
        target: 'http://pages.hxgis.com/json/',
        changeOrigin: true
        // pathRewrite: { '^/api': '' }
      }
    }
  },
  json: {
    namedExports: true // 允许从json 文件中进行按名导入。
  }
  // envDir: '' // 用于加载 .env 文件的目录。可以是一个绝对路径，也可以是相对于项目根的路径。
})
