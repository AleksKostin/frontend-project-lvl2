import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('gendiff flat JSON', () => {
  const expected = readFileSync(getFixturePath('correct.txt'), 'utf8');
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  expect(genDiff(file1, file2)).toEqual(expected);
});

test('gendiff flat YAML', () => {
  const expected2 = readFileSync(getFixturePath('correct.txt'), 'utf8');
  const file3 = getFixturePath('file1.yaml');
  const file4 = getFixturePath('file2.yml');
  expect(genDiff(file3, file4)).toEqual(expected2);
  const file5 = getFixturePath('file1.txt');
  const file6 = getFixturePath('file2.exe');
  expect(genDiff(file5, file6)).toEqual('file format not supported');
});
