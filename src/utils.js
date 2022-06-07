import { readFileSync } from 'fs';
import path from 'path';
import _ from 'lodash';

export const readFile = (filePath) => {
  const fullPath = path.resolve(process.cwd(), filePath);
  const data = readFileSync(fullPath, 'utf8');
  return data;
};

export const getAstDiff = (data1, data2) => {
  const keys = _.uniq((_.sortBy([...Object.keys(data1), ...Object.keys(data2)])));
  return keys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    if (!Object.hasOwn(data1, key)) {
      return {
        key,
        value: value2,
        type: 'added',
      };
    }
    if (!Object.hasOwn(data2, key)) {
      return {
        key,
        value: value1,
        type: 'deleted',
      };
    }
    if (value1 === value2) {
      return {
        key,
        value: value1,
        type: 'unchanged',
      };
    }
    if (_.isObject(value1) && _.isObject(value2)) {
      return {
        key,
        children: getAstDiff(value1, value2),
        type: 'nested',
      };
    }
    return {
      key,
      oldValue: value1,
      newValue: value2,
      type: 'changed',
    };
  });
};
