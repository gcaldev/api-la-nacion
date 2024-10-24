const ALL_ACCOUNTS = require('../utils/mocks/accounts.json');

const getAccounts = async () => {
  return new Promise((resolve) => {
    resolve(ALL_ACCOUNTS);
  });
};

module.exports = {
  getAccounts
};
