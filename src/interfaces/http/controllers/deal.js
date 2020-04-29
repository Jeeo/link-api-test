import { buildResponse } from '../../../utils/http';

export const pushDeals = async (ctx) => {
  try {
    const response = await ctx.application.deal.push();
    if (response) {
      return buildResponse({
        ctx,
        message: 'Operation Success',
        data: response,
        status: 200,
      });
    }
    return buildResponse({
      ctx,
      message: 'Operation Failed',
      data: response,
      status: 400,
    });
  } catch (ex) {
    console.error(ex);
    return buildResponse({
      ctx,
      message: 'Operation Failed',
      data: { message: ex.message },
      status: 502,
    });
  }
};

export const getDeals = async (ctx) => {
  try {
    const response = await ctx.application.deal.get();
    if (response) {
      return buildResponse({
        ctx,
        message: 'Operation Success',
        data: response,
        status: 200,
      });
    }
    return buildResponse({
      ctx,
      message: 'Operation Failed',
      data: response,
      status: 400,
    });
  } catch (ex) {
    console.error(ex);
    return buildResponse({
      ctx,
      message: 'Operation Failed',
      data: { message: ex.message },
      status: 502,
    });
  }
};
