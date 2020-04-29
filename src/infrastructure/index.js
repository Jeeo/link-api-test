import repositories from './repositories';
import dataModels from './database';

export default async (ctx, next) => {
  ctx.repositories = repositories(dataModels);
  await next();
};
