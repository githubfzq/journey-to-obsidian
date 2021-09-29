import { readFile, writeFile, readdir } from 'fs/promises';
import { join, resolve } from 'path';
const { EOL } = require('os');

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import moment from 'moment';

import markdown from './markdown';

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

function asyncParallelForEach(container, cb) {
  return Promise.all(container.map(cb))
}

async function readJson(path) {
  const content = await readFile(path, 'utf8');
  return JSON.parse(content);
}

async function readObjects(path) {
  const fileNames = await readdir(path);

  return asyncParallelForEach(fileNames,
    async fileName => readJson(join(path, fileName))
  );
}

function sortObjects(objects) {
  return objects.reduce((acc, obj) => {
    const time = moment(obj.date_journal);
    const key = time.format("YYYY-MM-DD");

    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
}

function renderFiles(outputDirectory, objects) {
  let promises = [];
  Object.keys(objects).forEach(date => {
    const filename = `${date}.md`;
    const outputPath = join(outputDirectory, filename);
    let content = "";
    objects[date].forEach((obj, i) => {
      content += i != 0 ? EOL : '';
      content += markdown(obj);
    });

    const prom = writeFile(outputPath, content, 'utf8')
      .then(() => {
        console.log(`Saved ${outputPath}`);
      });

    promises.push(prom);
  });

  return Promise.all(promises);
}

async function main() {
  const input = resolve(argv.input_directory);
  const output = resolve(argv.output_directory);

  console.log(`Read from ${input}`);
  console.log(`Save to ${output}`);

  let objects = await readObjects(input);
  objects = sortObjects(objects);

  await renderFiles(output, objects);
}

main();
