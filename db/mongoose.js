var mongoose = require('mongoose'),
config   = require('../config/db');

mongoose.Promise = global.Promise;
mongoose.connect(config.db,{ useMongoClient: true });

module.exports = {mongoose}