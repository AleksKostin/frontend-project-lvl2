#!/usr/bin/env node
import { Command } from 'commander';
import genDiffJson from '../src/index.js';

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
