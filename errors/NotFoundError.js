const throwNotFoundError = (message) => {
  const error = new Error(message);
  error.name = 'NotFoundError';
  error.details = [{
    type: 'NotFoundError',
  }];
  throw error;
};

module.exports = {
  throwNotFoundError,
};
