import { readFileSync } from 'fs';
import path from 'path';

const readFile = (filePath) => {
  const fullPath = path.resolve(process.cwd(), filePath);
  const data = readFileSync(fullPath, 'utf8');
  return data;
};

export default readFile;
