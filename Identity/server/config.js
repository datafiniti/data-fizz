'use strict';
// Hold app secrets and config
module.exports = {
  // hard-coded b/c of challenge spec. to not have config req. beyond npm i/start
  // would typically load in a .env file using dotenv package with JWT_SECRET=whateverRandomString
  JWT_SECRET: 'datafinitiRocks',
};
