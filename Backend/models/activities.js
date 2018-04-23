var mongoose = require('mongoose');
var config = require('../config.json');

var member = new mongoose.Schema({
    name: String,
    email: String
});

var activitySchema = new mongoose.Schema({
    object: mongoose.Types.ObjectId(),
    objectType: String,
    member: member,
    action: String,
    date: Date
});

module.exports = mongoose.model('Activity', activitySchema, 'activities');