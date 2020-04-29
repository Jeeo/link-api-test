import axios from 'axios';
import qs from 'querystring';

import config from '../../config';

const HOST = config.PIPEDRIVE_HOST;
const API_KEY = config.PIPEDRIVE_API_KEY;

export const getWonDeals = (param) => {
  const params = {
    status: 'won',
    api_token: API_KEY,
    ...param,
  };

  return axios.get(`${HOST}/deals/?${qs.stringify(params)}`)
    .then(({ data }) => data);
};
