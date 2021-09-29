import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { resolve } from 'path';

const argv = yargs(hideBin(process.argv))
  .option('input_directory', {
    alias: 'i',
    type: "string",
    default: "data"
  })
  .option('output_directory', {
    alias: 'o',
    type: "string",
    default: "output"
  })
  .argv

function main() {
  console.log(`Read from ${resolve(argv.input_directory)}`);
  console.log(`Save to ${resolve(argv.output_directory)}`);
}

main();
