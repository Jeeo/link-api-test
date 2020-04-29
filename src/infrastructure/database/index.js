import fs from 'fs';

const dir = `${__dirname}/models/`;
const models = fs.readdirSync(dir).map((el) => el.replace('.js', ''));
const modules = models.map((el) => {
  const mod = require(`${dir}/${el}`);
  if (mod.default) {
    return { [el]: mod.default };
  }
  return { [el]: mod };
})
  .reduce((acc, cur) => ({ ...acc, ...cur }), {});

export default ({
  ...modules,
});
