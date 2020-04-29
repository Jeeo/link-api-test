/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import fs from 'fs';

const applications = fs.readdirSync(__dirname).map((el) => el.replace('.js', '')).filter((el) => el !== 'index');
const modules = applications.map((el) => {
  const mod = require(`${__dirname}/${el}`);
  if (mod.default) {
    return { [el]: mod.default };
  }
})
  .reduce((acc, cur) => ({ ...acc, ...cur }), {});

export default async (ctx, next) => {
  ctx.application = {};
  Object.keys(modules).forEach((key) => {
    ctx.application[key] = modules[key](ctx);
  });
  await next();
};
