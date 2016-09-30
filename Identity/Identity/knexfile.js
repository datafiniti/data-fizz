var path = require('path');

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: path.join(__dirname, './db/shortly_dev.sqlite')
    }
  },

  test: {
    client: 'sqlite3',
    connection: {
      filename: path.join(__dirname, './db/shortly_test.sqlite')
    }
  },

};
