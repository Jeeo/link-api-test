import fs from 'fs';
import Router from 'koa-router';

const router = new Router({ prefix: '/api/v1' });

const routers = fs.readdirSync(__dirname)
  .map((el) => el.replace('.js', ''))
  .filter((el) => el !== 'index');
const modules = routers.map((el) => {
  const mod = require(`${__dirname}/${el}`);
  if (mod.default) {
    return { [el]: mod.default };
  }
  return null;
})
  .reduce((acc, cur) => ({ ...acc, ...cur }), {});

Object.keys(modules).forEach((key) => {
  router.use(modules[key].routes());
});

export default router;
