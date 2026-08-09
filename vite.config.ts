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
    outDir: 'dist',
  },
});
