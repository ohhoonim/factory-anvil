import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentsDir = path.resolve(__dirname, './components');

// console.log(componentsDir);

const subdirs = fs.readdirSync(componentsDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => `export * from './${dirent.name}/index';\n`);

fs.writeFileSync(path.join(componentsDir, 'index.ts'), subdirs.join(''));