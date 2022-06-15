#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../src/index.js';

const program = new Command();
program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference')
  .version('0.1.0')
  .argument('<filePath1>')
  .argument('<filePath2>')
  .option('-f, --format <type>', 'output format', 'stylish')
  .helpOption('-h, --help', 'output usage information')
  .action((filePath1, filePath2, option) => {
    console.log(genDiff(filePath1, filePath2, option.format));
  });
program.parse();
