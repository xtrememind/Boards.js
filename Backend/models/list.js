var mongoose = require('mongoose');
var config = require('../config.json');

mongoose.connect(config.connectionString);

var card = new mongoose.Schema({
    name: String,
    dueDate: Date,
    position: Number
});

var listSchema = new mongoose.Schema({
    name: String,
    cards: [card]
});

module.exports = mongoose.model('List', listSchema, 'lists');