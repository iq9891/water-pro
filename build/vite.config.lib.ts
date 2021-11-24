import type { InlineConfig } from 'vite';
import vueJsx from '@vitejs/plugin-vue-jsx';

// modal-pro 不显示
export default (): InlineConfig => {
  const root = process.cwd();
  return {
    root,
    // esbuild: {
    //   jsxFactory: 'createVNode',
    //   jsxFragment: 'Fragment',
    //   jsxInject: `import {createVNode} from 'vue'`
    // },
    plugins: [
      vueJsx(),
    ],
    build: {
      lib: {
        entry: `${root}/components/index.ts`,
        name: 'waterPro',
      },
      // minify: 'terser',
      minify: false,
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
      outDir: 'dist',
      polyfillDynamicImport: false,
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: true,
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
          },
          javascriptEnabled: true,
        },
      },
    },
  };
};
