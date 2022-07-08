const minName = (message) => {
  const error = new Error(message);
  error.name = 'MinName';
  throw error;
};

const requiredName = (message) => {
  const error = new Error(message);
  error.name = 'RequiredName';
  throw error;
};

module.exports = {
  minName,
  requiredName,
};