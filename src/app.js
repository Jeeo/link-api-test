import Koa from 'koa';
import boot from './boot';

const app = new Koa();
boot(app);
