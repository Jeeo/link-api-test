/* eslint-disable no-await-in-loop */
import xml from 'xml2js';
import moment from 'moment';

import { getWonDeals } from '../infrastructure/http/pipedrive';
import { dummyCurrencyConv } from '../utils/currency';
import { createOrder } from '../infrastructure/http/bling';

const xmlBuilder = new xml.Builder();

const buildBlingPayload = (data) => ({
  pedido: {
    cliente: {
      nome: data.org_name,
      ...(data.person_id.email.length
        && data.person_id.email[0].value && {
        email: data.person_id.email[0].value,
      }),
      ...(data.person_id.phone.length
        && data.person_id.phone[0].value && {
        email: data.person_id.email[0].value,
      }),
    },
    itens: {
      item: [
        {
          descricao: data.title,
          vlr_unit: dummyCurrencyConv(data.value, data.currency),
          qtde: '1.00',
          codigo: 123,
        },
      ],
    },
    data: moment(data.won_time).format('DD/MM/YYYY'),
  },
});

const buildPersistentDeal = async ({ response, payload, labels }) => {
  const parsed = await xml.parseStringPromise(payload);
  return {
    blingRef: response.retorno.pedidos[0].pedido.numero,
    pipedriveRef: labels.pipedriveId,
    value: parsed.pedido.itens[0].item[0].vlr_unit[0],
    date: moment(parsed.pedido.data, 'DD/MM/YYYY'),
  };
};

export default (ctx) => ({
  push: async () => {
    const pagination = {
      start: 0,
      limit: 100,
    };
    let runAgain = false;
    do {
      const response = await getWonDeals(pagination);
      const { data: deals, additional_data } = response; //eslint-disable-line
      runAgain = additional_data.pagination.more_items_in_collection;

      if (runAgain) {
        pagination.start = additional_data.pagination.next_start;
      }
      const toPush = deals.map(buildBlingPayload).map(el => xmlBuilder.buildObject(el));
      const responses = await Promise.all(toPush.map((el, i) => {
        const labels = { pipedriveId: deals[i].id };
        return ctx.application.jobs.run(createOrder, el, labels);
      }));
      const successRequests = responses.filter(el => !el.response.retorno.erros);
      const toPersist = await Promise.all(successRequests.map(buildPersistentDeal));
      await ctx.repositories.deal.insertMany(toPersist);
    } while (runAgain);

    return { details: '' };
  },

  get: async () => {
    const response = await ctx.repositories.deal.model.aggregate([
      { $group: { _id: '$date', amount: { $sum: '$value' } } },
      { $project: { _id: 0, date: '$_id', amount: 1 } },
    ]);

    return response;
  },
});
