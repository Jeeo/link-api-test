import fs from 'fs';

const repositories = fs.readdirSync(__dirname)
  .map((el) => el.replace('.js', ''))
  .filter((el) => el !== 'index');

const modules = repositories.map((el) => {
  const mod = require(`${__dirname}/${el}`);
  if (mod.default) {
    return { [el]: mod.default };
  }
  return null;
})
  .reduce((acc, cur) => ({ ...acc, ...cur }), {});

export default ({
  ...modules,
});
