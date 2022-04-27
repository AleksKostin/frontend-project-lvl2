import { Command } from 'commander';

const getGenDiffHelp = () => {
  const program = new Command();
  program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference')
    .version('0.1.0');

  program.parse();
};

export default getGenDiffHelp;