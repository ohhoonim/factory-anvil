import { generateCustomData } from 'cem-plugin-vs-code-custom-data-generator';

export default {
  globs: ['src/**/*.ts'],
  litelement: true,
  plugins: [
    generateCustomData({
      htmlFileName: 'vscode-html-custom-data.json'
    })
  ]
};