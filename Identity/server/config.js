'use strict';
// Hold app secrets and config
module.exports = {
  JWT_SECRET: 'datafinitiRocks',
  NODE_MAILER_FROM: { user: 'appbuilding247@gmail.com' }
};

/* --- NOTE --- */
// I hard-coded these variables b/c of challenge spec. to not have config req. beyond npm i/start
// would typically load in a .env file using dotenv package with JWT_SECRET=whateverRandomString
