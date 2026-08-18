import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    dedupe: ['lit', 'lit-html', 'lit-element'],
  },
  build: {
    emptyOutDir: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'BizUI',
      formats: ['es', 'umd'],
      fileName: (format) => `bizui-library-index.${format}.js`,
    },
    rollupOptions: {
      external: ['lit', 'lit/directives/repeat.js'],
      output: {
        globals: {
          lit: 'Lit',
          'lit/directives/repeat.js': 'LitRepeat',
        },
      },
    },
    // rollupOptions: {
    //   // Lit을 외부화하지 않고 번들에 포함시킵니다.
    //   external: [],
    //   output: {
    //     globals: {},
    //   },
    // },
    outDir: 'dist',
  },
});
