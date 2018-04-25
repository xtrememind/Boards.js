var mongoose = require('mongoose');
var config = require('../config.json');

mongoose.connect(config.connectionString);

var member = new mongoose.Schema({
    name: String,
    email: String
});

var board = new mongoose.Schema({
    name: String
});

var teamSchema = new mongoose.Schema({
    name: String,
    members: [member],
    boards:[board]
});

module.exports = mongoose.model('Team', teamSchema, 'teams');