'use strict'

let path = require('path');
let Sequelize = require('sequelize');

let env = require(path.join(__dirname, '../env/development.js'));

// let db = new Sequelize('dfiniti', 'bpr', 'sunshine', {
//   dialect: 'postgres',
//   port: 5432
// });

let db = new Sequelize(env.DATABASE_URI, {
  dialect:  'postgres',
  protocol: 'postgres',
  dialectOptions: {
     ssl: true
 }
})

let User = require('./models/user')(db);
let Session = require('./models/session')(db);
let Rreset = require('./models/reset')(db);

Session.belongsTo(User);
Rreset.belongsTo(User);

module.exports = db;
