import { Command } from 'commander';

const getGenDiffHelp = () => {
  const program = new Command();
  program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference')
    .version('0.1.0')
    .argument('<filepath1> <filepath2>')
    .option('-f, --format <type>', 'output format')
    .helpOption('-h, --help', 'output usage information');
  program.parse();
};

export default getGenDiffHelp;
