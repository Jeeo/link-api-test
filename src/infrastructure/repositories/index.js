import domains from './domains';

export default (models) => {
  let repositories = {};
  Object.keys(models).forEach((model) => {
    if (domains[model]) {
      const Repository = domains[model];
      repositories = {
        ...repositories,
        [model]: new Repository(models[model]),
      };
    }
  });
  return repositories;
};
