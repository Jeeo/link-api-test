import Router from 'koa-router';
import * as Controller from '../controllers/deal';

const router = new Router({ prefix: '/deals' });

router.get('/', Controller.getDeals);
router.post('/push', Controller.pushDeals);

export default router;
