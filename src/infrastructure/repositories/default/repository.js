export default class Repository {
  constructor(model) {
    this.model = model;
  }

  async find(criteria, params) {
    let projection = {};
    const meta = params;
    if (params && params.select) {
      projection = params.select;
    }
    if (params && !params.skip) {
      meta.skip = 0;
    }
    if (params && !params.limit) {
      meta.limit = 10;
    }
    return this.model.find(criteria, projection, meta);
  }

  async findOne(criteria, params) {
    return this.model.findOne(criteria, params);
  }

  async create(entity) {
    return this.model.create(entity);
  }

  async insertMany(data) {
    return this.model.insertMany(data);
  }

  async updateOne(criteria, data) {
    return this.model.updateOne(criteria, { $set: data });
  }

  async updateOneArray(criteria, data) {
    return this.model.updateOne(criteria, data);
  }

  async deleteOne(criteria) {
    return this.model.deleteOne(criteria);
  }


  async liveness() {
    return this.model.db.readyState;
  }
}
