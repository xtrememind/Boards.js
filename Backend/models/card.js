var mongoose = require('mongoose');
var config = require('../config.json');

mongoose.connect(config.connectionString);

var attachment = new mongoose.Schema({
    url: String,
    name: String
});

var label = new mongoose.Schema({
    name: String,
    color: String
});

var member = new mongoose.Schema({
    name: String,
    email: String
});

var comment = new mongoose.Schema({
    member: String,
    text: String,
    date: Date
});

var cardSchema = new mongoose.Schema({
    name: String,
    description: String,
    dueDate: Date,
    // attachments: [attachment],
    labels: [label],
    members: [member],
    checklists: [String],
    comments: [comment]
});

module.exports = mongoose.model('Card', cardSchema, 'cards');