import getParseFile from './parsers.js';
import { getAstDiff } from './utils.js';
import formattedDiff from './formatters/index.js';

const genDiff = (filePath1, filePath2, format) => {
  const data1 = getParseFile(filePath1);
  const data2 = getParseFile(filePath2);
  const diff = getAstDiff(data1, data2);
  return formattedDiff(diff, format);
};

export default genDiff;
