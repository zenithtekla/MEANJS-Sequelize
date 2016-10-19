'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var _ = require('lodash');
var config = require('../config');
var chalk = require('chalk');
var winston = require('./winston');

chalk.green('Initializing Sequelize...');

var orm = require('./sequelize');

var models = [];

config.files.server.rdbmsModels.forEach(function(file) {
  models.push(path.resolve(file));
});

orm.discover = models;
orm.connect(config.rdbms.name, config.rdbms.username, config.rdbms.password, {
  host: config.rdbms.host,
  port: config.rdbms.port,
  dialect: config.rdbms.dialect,
  storage: config.rdbms.storage,
  logging: config.rdbms.enableSequelizeLog ? winston.verbose : false,
  dialectOptions: {
    ssl: config.rdbms.ssl ? config.rdbms.ssl : false
  }
});
