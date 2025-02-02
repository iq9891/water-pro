import type { UserConfig, ConfigEnv } from 'vite';

// const { resolve } = require('path');

import { loadEnv } from 'vite';

import { wrapperEnv, pathResolve } from './utils';
import { createVitePlugins } from './vite-plugins';

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();

  const env = loadEnv(mode, root);

  // The boolean type read by loadEnv is a string. This function can be converted to boolean type
  const viteEnv = wrapperEnv(env);

  const isBuild = command === 'build';

  return {
    root: `${root}`,
    resolve: {
      alias: [
        {
          // @@xxxx  =>  src/xxx
          find: /^\@@/,
          replacement: `${pathResolve('components')}/`,
        },
      ],
    },
    // esbuild: {
      // jsxFactory: 'h',
      // jsxFragment: 'Fragment'
    // },
    build: {
      lib: {
        entry: `${root}/components/index.ts`,
        name: 'water-pro'
      },
      rollupOptions: {
        output: [
          {
            format: "esm",
            esModule: true,
            exports: "named",
            globals: {
              vue: "Vue"
            }
          },
          {
            format: "umd",
            inlineDynamicImports: true,
            interop: "esModule",
            exports: "named",
            globals: {
              vue: "Vue"
            }
          },
        ],
      },
      // rollupOptions: {
      //   input: {
      //     main: resolve(root, 'index.html'),
      //   }
      // },
      outDir: 'dist',
      polyfillDynamicImport: false,
      terserOptions: {
        compress: {
          keep_infinity: true,
          // Used to delete console in production environment
          // drop_console: isBuild,
        },
      },
      // Turning off brotliSize display can slightly reduce packaging time
      brotliSize: false,
      chunkSizeWarningLimit: 1200,
      commonjsOptions: {
        exclude: ['examples', 'demo'],
      },
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
    plugins: createVitePlugins(viteEnv, isBuild, true),
  };
};
