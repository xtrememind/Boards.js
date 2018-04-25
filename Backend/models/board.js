var mongoose = require('mongoose');
var config = require('../config.json');

mongoose.connect(config.connectionString);

var list = new mongoose.Schema({
    name: String,
    position: Number
});

var boardSchema = new mongoose.Schema({
    name: String,
    lists: [list]
});

module.exports = mongoose.model('Board', boardSchema, 'boards');