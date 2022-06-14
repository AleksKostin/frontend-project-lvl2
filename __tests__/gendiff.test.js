import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const file1 = getFixturePath('nested_json1.json');
const file2 = getFixturePath('nested_json2.json');
const file3 = getFixturePath('nested_yml1.yaml');
const file4 = getFixturePath('nested_yml2.yml');

const expected1 = readFileSync(getFixturePath('correct_nested.txt'), 'utf8');
const expected2 = readFileSync(getFixturePath('correct_plain.txt'), 'utf8');

test('gendiff nested JSON', () => {
  expect(genDiff(file1, file2)).toBe(expected1);
});

test('gendiff nested YAML', () => {
  expect(genDiff(file3, file4)).toBe(expected1);
});

test('gendiff plain JSON', () => {
  expect(genDiff(file1, file2, 'plain')).toBe(expected2);
});

test('gendiff plain YAML', () => {
  expect(genDiff(file3, file4, 'plain')).toBe(expected2);
});
