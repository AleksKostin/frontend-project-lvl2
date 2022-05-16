import _ from 'lodash';
import getParseFile from './parsers.js';

const genDiff = (filePath1, filePath2) => {
  const data1 = getParseFile(filePath1);
  const data2 = getParseFile(filePath2);
  if (data1 === 'error' || data2 === 'error') {
    return 'file format not supported';
  }
  const keysOfData1 = Object.keys(data1);
  const keysOfData2 = Object.keys(data2);
  const concatKeys = [...keysOfData1, ...keysOfData2];
  const sortedKeys = _.uniq((_.sortBy(concatKeys)));
  const tab = '  ';
  const diff = sortedKeys.map((key) => {
    if (Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
      if (data1[key] !== data2[key]) {
        return `${tab}- ${key}: ${data1[key]}\n${tab}+ ${key}: ${data2[key]}`;
      }
    }
    if (!Object.hasOwn(data1, key) || !Object.hasOwn(data2, key)) {
      if (!Object.hasOwn(data2, key)) {
        return `${tab}- ${key}: ${data1[key]}`;
      } if (!Object.hasOwn(data1, key)) {
        return `${tab}+ ${key}: ${data2[key]}`;
      }
    }
    return `${tab}${tab}${key}: ${data1[key]}`;
  });
  return ['{', ...diff, '}'].join('\n');
};

export default genDiff;
