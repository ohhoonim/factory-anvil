import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    emptyOutDir: false, // Don't empty because the vanilla build already ran
    lib: {
      entry: path.resolve(__dirname, 'src/react.ts'),
      name: 'BizUIReact',
      formats: ['es', 'cjs'],
      fileName: (format) => `bizui-library-react.${format}.js`,
    },
    rollupOptions: {
      external: ['lit', 'react', 'react-dom', '@lit/react', 'lit/directives/repeat.js'],
      output: {
        globals: {
          lit: 'Lit',
          react: 'React',
          'react-dom': 'ReactDOM',
          '@lit/react': 'LitReact',
          'lit/directives/repeat.js': 'LitRepeat',
        },
      },
    },
    outDir: 'dist',
  },
});
