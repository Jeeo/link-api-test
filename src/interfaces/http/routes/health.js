import Router from 'koa-router';
import * as Controller from '../controllers/health';

const router = new Router({ prefix: '/health' });

router.get('/', Controller.Api);

export default router;
