import 'dotenv/config';
import application from './application';
import middlewares from './interfaces/http/middlewares';
import infrasctructure from './infrastructure';
import databaseConnection from './infrastructure/database/connection';
import router from './interfaces/http/routes';
import config  from './config';

export default async (app) => {
  const { DB_CONNECTION, PORT } = config;
  try {
    await databaseConnection(DB_CONNECTION);
    console.log('Successfully connected on database');
  } catch (err) {
    console.error(err);
  }

  app.use(infrasctructure);
  app.use(application);
  middlewares(app);
  app.use(router.routes());

  app.listen(PORT, () => console.log(`listening on ${PORT}`));
};
