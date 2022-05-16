import path from 'path';
import yaml from 'js-yaml';
import readFile from './utils.js';

const getParseFile = (filePath) => {
  const formatFile = path.extname(filePath);
  if (formatFile === '.json') {
    return JSON.parse(readFile(filePath));
  } if (formatFile === '.yml' || formatFile === '.yaml') {
    return yaml.load(readFile(filePath));
  }
  return 'error';
};

export default getParseFile;
