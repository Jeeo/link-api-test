/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */

export const defaultErrorHandler = (err) => {
  console.error(err);
  throw err;
};