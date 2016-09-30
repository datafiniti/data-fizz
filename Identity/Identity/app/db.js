var path = require('path');

var config = require('../knexfile.js')
var env = process.env.NODE_ENV || 'development'
var knex = require('knex')(config[env])

module.exports = knex

knex.deleteEverything = function () {
  return knex('clicks').truncate()
    .then(function () {
      return knex('links').truncate()
    })

    .then(function () {
      return knex('sessions').truncate()
    })
    .then(function () {
      return knex('users').truncate()
    })
    }

knex.ensureSchema = function () {
  return Promise.all([
    knex.schema.hasTable('links').then(function(exists) {
      if (!exists) {
        knex.schema.createTable('links', function (table) {
          table.increments('id').primary();
          table.string('url', 255);
          table.string('base_url', 255);
          table.string('code', 100);
          table.string('title', 255);
          table.integer('visits');
          table.timestamps();
        }).then(function (table) {
          console.log('Created links table.');
        });
      }
    }),

    knex.schema.hasTable('clicks').then(function(exists) {
      if (!exists) {
        knex.schema.createTable('clicks', function (table) {
          table.increments('id').primary();
          table.integer('link_id');
          table.timestamps();
        }).then(function (table) {
          console.log('Created clicks table.');
        });
      }
    }),

    knex.schema.hasTable('users').then(function(exists) {
      if (!exists) {
        knex.schema.createTable('users', function (table) {
          table.increments('id').primary();
          table.string('username', 100).unique();
          table.string('password_hash', 100);
          table.timestamps();
        }).then(function (table) {
          console.log('Created users table.');
        });
      }
    }),

    knex.schema.hasTable('sessions').then(function(exists) {
      if (!exists) {
        knex.schema.createTable('sessions', function (table) {
          table.string('id').primary();
          table.integer('user_id');
          table.timestamps();
        }).then(function (table) {
          console.log('Created sessions table.');
        });
      }
    }),

  ])
}
