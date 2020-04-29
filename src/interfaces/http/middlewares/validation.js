export default async (ctx, next) => {
  ctx.validate = {
  };
  await next();
};
