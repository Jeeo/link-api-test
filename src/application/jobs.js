
export default (ctx) => ({
  run: async (job, payload, labels) => {
    const j = {
      status: 'running',
      name: job.name,
      label: JSON.stringify(labels),
    };
    const created = await ctx.repositories.job.create(j);

    return job(payload)
      .then(res => {
        let success = false;

        if (!res.data.retorno.erros) {
          success = true;
        }
        ctx.repositories.job.updateOne({ _id: created._id }, {
          success,
          status: 'done',
        });
        return { response: res.data, payload, labels };
      })
      .catch(e => {
        ctx.repositories.job.updateOne({ _id: created._id }, {
          success: false,
          status: 'done',
        });
        return e;
      });
  },
});
