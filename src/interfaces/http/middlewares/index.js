import cors from '@koa/cors';
import helmet from 'koa-helmet';
import bodyParser from 'koa-bodyparser';
import morgan from 'koa-morgan';
import validation from './validation';

export default (app) => {
  app.use(cors());
  app.use(helmet());
  app.use(bodyParser());
  app.use(morgan('combined'));
  app.use(validation);
};
