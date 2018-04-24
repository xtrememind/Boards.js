var mongoose = require('mongoose');
var config = require('../config.json');

mongoose.connect(config.connectionString);

var task = new mongoose.Schema({
    name: String,
    status: String
});

var checklistSchema = new mongoose.Schema({
    name: String,
    tasks: [task]
});

module.exports = mongoose.model('Checklist', checklistSchema, 'checklist');