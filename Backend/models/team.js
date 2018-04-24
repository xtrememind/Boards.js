var mongoose = require('mongoose');
var config = require('../config.json');

mongoose.connect(config.connectionString);

var comment = new mongoose.Schema({
    member: String,
    text: String,
    date: Date
});

var task = new mongoose.Schema({
    name: String,
    status: String
});

var checklist = new mongoose.Schema({
    name: String,
    tasks: [task]
});

var member = new mongoose.Schema({
    name: String,
    email: String
});

var label = new mongoose.Schema({
    name: String,
    color: String
});

var attachment = new mongoose.Schema({
    url: String,
    name: String
});

var card = new mongoose.Schema({
    name: String,
    description: String,
    position: Number,
    dueDate: Date,
    attachments: [attachment],
    labels: [label],
    members: [member],
    checklists: [checklist],
    comments: [comment]
});

var list = new mongoose.Schema({
    name: String,
    position: Number,
    cards: [card]
});


var board = new mongoose.Schema({
    name: String,
    lists: [list]
});

var teamSchema = new mongoose.Schema({
    name: String,
    members: [member],
    boards:[board]
});

module.exports = mongoose.model('Team', teamSchema, 'teams');