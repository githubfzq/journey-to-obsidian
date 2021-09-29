const { EOL } = require('os');

import cheerio from "cheerio";
import moment from 'moment';

function parseHtml(object) {
  const document = cheerio.load(object.text);
  let output = "";

  document('p').map((_, e) => {
    const p = cheerio(e).text();
    output += p.trim() + EOL + EOL;
  });

  return output;
}

function parseMeta(object) {
  let output = "Meta:" + EOL;

  const keys = ["id", "address", "lat", "lon", "timezone", "linked_account_id"];

  keys.forEach(key => {
    output += `- ${key}: ${object[key]}${EOL}`;
  });

  output += `- weather: ${object.weather.degree_c}* ${object.weather.description}${EOL}`;

  if (object.photos.length > 0) {
    output += "- photos:" + EOL;
    object.photos.forEach((photo, i) => {
      output += `  - ![fotulka_${i + 1}](${photo})${EOL}`;
    });
  }

  output += `- tags: `;

  object.tags.forEach((tag, i) => {
    output += i != 0 ? ', ' : '';
    output += `#${tag}`;
  });

  output += EOL;

  return output;
}

export default function (object) {
  let output = "";

  const time = moment(object.date_journal);
  const timeStr = time.format("HH:mm:ss");

  output += `## ${timeStr}${EOL}`;
  output += parseHtml(object);
  output += parseMeta(object);

  return output;
}
