const AppError = require('./appError');

const removeDuplicates = (arr) => {
  const unique = [];
  arr.forEach((element) => {
    if (!unique.includes(element)) {
      unique.push(element);
    }
  });
  return unique;
};

const asycnWrapper = (promise) => promise
  .then((data) => ([undefined, data]))
  .catch((err) => ([err]));

module.exports = {
  asycnWrapper,
  removeDuplicates,
  AppError,

};
