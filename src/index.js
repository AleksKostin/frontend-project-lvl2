import { readFileSync } from 'fs';
import path from 'path';
import _ from 'lodash';

const readFile = (filePath) => {
  const fullPath = path.resolve(process.cwd(), filePath);
  const data = readFileSync(fullPath, 'utf8');
  return data;
};

const genDiffJson = (filePath1, filePath2) => {
  const data1 = JSON.parse(readFile(filePath1));
  const data2 = JSON.parse(readFile(filePath2));
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
  const result = ['{', ...diff, '}'];
  return result.join('\n');
};

export default genDiffJson;
