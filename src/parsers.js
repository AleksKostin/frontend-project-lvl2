import path from 'path';
import yaml from 'js-yaml';
import { readFile } from './utils.js';

const getParseFile = (filePath) => {
  const formatFile = path.extname(filePath).slice(1);
  switch (formatFile) {
    case 'json':
      return JSON.parse(readFile(filePath));
    case 'yaml':
      return yaml.load(readFile(filePath));
    case 'yml':
      return yaml.load(readFile(filePath));
    default:
      throw new Error(`${formatFile} format not supported`);
  }
};

export default getParseFile;
