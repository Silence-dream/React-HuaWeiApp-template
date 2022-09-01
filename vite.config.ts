import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig } from 'vite';
import importToCDN from 'vite-plugin-cdn-import';
import vitePluginZipDist from 'vite-plugin-dist-zip';
import { viteExternalsPlugin } from 'vite-plugin-externals';
// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  plugins: [
    react(),
    viteExternalsPlugin({
      react: 'React',
      'react-dom': 'ReactDOM',
    }),
    importToCDN({
      modules: [
        {
          name: 'react',
          var: 'React',
          path: `https://unpkg.com/react@17/umd/react.production.min.js`,
        },
        {
          name: 'react-dom',
          var: 'ReactDOM',
          path: `https://unpkg.com/react-dom@17/umd/react-dom.production.min.js`,
        },
      ],
    }),
    vitePluginZipDist({ zipName: 'test', zipDir: './' }),
  ],

  build: {
    target: 'es2015',
    rollupOptions: {
      output: {
        // chunk 文件名
        chunkFileNames: 'js/[name].[hash].js',
        assetFileNames: (chunkInfo) => {
          // 用后缀名称进行区别处理
          // 处理其他资源文件名 e.g. css png 等
          let subDir = 'img';

          if (path.extname(chunkInfo.name) === '.css') {
            subDir = 'css';
          }

          return `${subDir}/[name].[hash].[ext]`;
        },
        // 入口文件名
        entryFileNames: 'js/[name].[hash].js',
        sourcemap: false,
      },
    },
  },
});
