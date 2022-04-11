import type { UserConfig, ConfigEnv } from 'vite';

const { resolve } = require('path');

import { loadEnv } from 'vite';

import { wrapperEnv, pathResolve } from './utils';
import { createVitePlugins } from './vite-plugins';
import { OUTPUT_DIR } from './constant';

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();

  const env = loadEnv(mode, root);

  // The boolean type read by loadEnv is a string. This function can be converted to boolean type
  const viteEnv = wrapperEnv(env);

  const isBuild = command === 'build';

  return {
    base: process.env.VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias: [
        {
          // @@xxxx  =>  src/xxx
          find: /^\@@/,
          replacement: `${pathResolve('components')}/`,
        },
        {
          // @@xxxx  =>  src/xxx
          find: /^\@fe6\/water-pro\/es\//,
          replacement: `${pathResolve('components')}/`,
        },
        {
          // @@xxxx  =>  src/xxx
          find: /^\@fe6\/water-pro$/,
          replacement: `${pathResolve('components')}/`,
        },
        {
          // @@xxxx  =>  src/xxx
          find: /^\@fe6\/water-pro\/directives\//,
          replacement: `${pathResolve('directives')}/`,
        },
      ],
    },
    server: {
      port: 5001,
      // Load proxy configuration from .env
      hmr: {
        overlay: true,
      },
    },

    build: {
      rollupOptions: {
        input: {
          main: resolve(root, 'index.html'),
        }
      },
      outDir: OUTPUT_DIR,
      polyfillDynamicImport: false,
      terserOptions: {
        compress: {
          keep_infinity: true,
          // Used to delete console in production environment
          drop_console: isBuild,
        },
      },
      // Turning off brotliSize display can slightly reduce packaging time
      brotliSize: false,
      chunkSizeWarningLimit: 1200,
    },
    define: {
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            // Used for global import to avoid the need to import each style file separately
            // reference:  Avoid repeated references
            // hack: `true; @import (reference) "${resolve('src/design/config.less')}";`,
            // ...generateModifyVars(),
            // 自定义主题
            // https://www.antdv.com/docs/vue/customize-theme-cn/
            // '@layout-header-background': '#001A42',
          },
          javascriptEnabled: true,
        },
      },
    },
    // The vite plugin used by the project. The quantity is large, so it is separately extracted and managed
    plugins: createVitePlugins(viteEnv, isBuild),
  };
};
