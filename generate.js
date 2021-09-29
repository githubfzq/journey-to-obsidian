import faker from 'faker';

faker.locale = "pl";

function generateParagraphs(amount) {
  const paragraphs = [];

  for (let i = 0; i < amount; ++i) {
    const className = faker.lorem.word();
    const content = faker.lorem.paragraph();
    paragraphs.push(`<p class="${className}">${content}</p>`);
  }

  return paragraphs.join("\n");
}

function getFakeArrayOf(n, cb, ...args) {
  return Array.apply(null, { length: n })
    .map(() => cb.apply(this, args));
}

function generateJson() {
  const ret = {};

  ret.text = generateParagraphs(faker.datatype.number(3) + 1);
  ret.date_modified = faker.date.recent(3).getTime();
  ret.date_journal = faker.date.recent(14).getTime();
  ret.id = faker.datatype.uuid();
  ret.preview_text = "";
  ret.address = faker.address.streetAddress();
  ret.music_artist = faker.name.findName();
  ret.music_title = faker.lorem.words(4);
  ret.lat = parseFloat(faker.address.latitude());
  ret.lon = parseFloat(faker.address.longitude());
  ret.mood = faker.music.genre();
  ret.label = "";
  ret.folder = "";
  ret.sentiment = faker.datatype.number(10);
  ret.timezone = "Europe/Warsaw";
  ret.favourite = faker.datatype.boolean();
  ret.type = "html";
  ret.linked_account_id = `drive-${faker.datatype.uuid()}`;
  ret.weather = {
    id: faker.datatype.number(100),
    degree_c: faker.datatype.float({ min: -15, max: 40, precision: 0.1 }),
    description: faker.lorem.words(2),
    icon: faker.lorem.word(),
    place: faker.address.city()
  };
  ret.photos = (() => {
    let photosAmount = faker.datatype.number(3);
    return getFakeArrayOf(photosAmount, faker.system.commonFileName, 'jpg');
  })();
  ret.tags = (() => {
    let photosAmount = faker.datatype.number(5);
    return getFakeArrayOf(photosAmount, faker.hacker.adjective);
  })();

  return ret;
}

console.log(JSON.stringify(generateJson()));
