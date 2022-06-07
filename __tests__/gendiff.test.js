import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('gendiff plain JSON', () => {
  const expected = readFileSync(getFixturePath('correct.txt'), 'utf8');
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  expect(genDiff(file1, file2)).toEqual(expected);
});

test('gendiff plain YAML', () => {
  const expected2 = readFileSync(getFixturePath('correct.txt'), 'utf8');
  const file3 = getFixturePath('file1.yaml');
  const file4 = getFixturePath('file2.yml');
  expect(genDiff(file3, file4)).toEqual(expected2);
  const file5 = getFixturePath('file1.txt');
  const file6 = getFixturePath('file2.exe');
  expect(genDiff(file5, file6)).toEqual('file format not supported');
});

test('gendiff nested JSON', () => {
  const expected3 = readFileSync(getFixturePath('correct_nested_json.txt'), 'utf8');
  const file7 = getFixturePath('nested_json1.json');
  const file8 = getFixturePath('nested_json2.json');
  expect(genDiff(file7, file8)).toEqual(expected3);
});
