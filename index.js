import getParseFile from './src/parsers.js';
import { getAstDiff } from './src/utils.js';
import formattedDiff from './src/formatters/index.js';

const genDiff = (filePath1, filePath2, formatter = 'stylish') => {
  const data1 = getParseFile(filePath1);
  const data2 = getParseFile(filePath2);
  const diff = getAstDiff(data1, data2);
  return formattedDiff(diff, formatter);
};

export default genDiff;
