import axios from 'axios';
import qs from 'querystring';

import config from '../../config';

const HOST = config.BLING_HOST;
const API_KEY = config.BLING_API_KEY;

export const createOrder = (xml) => {
  if (!xml) {
    throw Error('You should provide the xml data');
  }
  const params = {
    xml,
    apikey: API_KEY,
  };

  return axios.post(`${HOST}/pedido/json/`, qs.stringify(params), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
};
