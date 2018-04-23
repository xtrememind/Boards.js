var mongoose = require('mongoose');
var config = require('../config.json');

mongoose.connect(config.connectionString);

var member = new mongoose.Schema({
    name: String,
    email: String
});

var activitySchema = new mongoose.Schema({
    objectId: String,
    objectType: String,
    member: member,
    action: String,
    date: Date
});

module.exports = mongoose.model('Activity', activitySchema, 'activities');