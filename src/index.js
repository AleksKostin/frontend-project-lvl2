import { Command } from 'commander';
import { readFileSync } from 'fs';
import path from 'path';
import _ from 'lodash';
// import { cwd } from 'process';

const genDiffJson = (filePath1, filePath2) => {
  const data1 = JSON.parse(readFileSync(path.resolve(filePath1), 'utf8'));
  const data2 = JSON.parse(readFileSync(path.resolve(filePath2), 'utf8'));
  const keysOfData1 = Object.keys(data1);
  const keysOfData2 = Object.keys(data2);
  const concatKeys = [...keysOfData1, ...keysOfData2];
  const sortedKeys = _.uniq((_.sortBy(concatKeys)));
  const diff = sortedKeys.flatMap((key) => {
    if (Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
      if (data1[key] === data2[key]) {
        return `    ${key}: ${data1[key]}`;
      } if (data1[key] !== data2[key]) {
        return `  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}`;
      }
    }
    if (!Object.hasOwn(data1, key) || !Object.hasOwn(data2, key)) {
      if (!Object.hasOwn(data2, key)) {
        return `  - ${key}: ${data1[key]}`;
      } if (!Object.hasOwn(data1, key)) {
        return `  + ${key}: ${data2[key]}`;
      }
    }
    return [];
  });
  const result = ['{', ...diff, '}'];
  return result.join('\n');
};

const genDiff = () => {
  const program = new Command();
  program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference')
    .version('0.1.0')
    .argument('<filePath1>')
    .argument('<filePath2>')
    .option('-f, --format <type>', 'output format')
    .helpOption('-h, --help', 'output usage information')
    .action((filePath1, filePath2) => {
      const [, formatFile1] = filePath1.split('.');
      const [, formatFile2] = filePath2.split('.');
      if (formatFile1 === 'json' && formatFile2 === 'json') {
        console.log(genDiffJson(filePath1, filePath2));
      }
      // console.log('error');
    });
  program.parse();
};

export default genDiff;
