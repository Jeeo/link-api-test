export const buildResponse = ({
  ctx, data, message, status,
}) => {
  ctx.body = { data, message, success: status === 200 };
  ctx.status = status;
};
