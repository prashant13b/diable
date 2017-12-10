var mongoose = require('mongoose'),
config   = require('../config/db');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/shatpat',{ useMongoClient: true });

module.exports = {mongoose}