var mongoose = require('mongoose');
var config = require('../config.json');

mongoose.connect(config.connectionString);


var openID = new mongoose.Schema({
    provider: String,
    token: String,
    id: String

});

var userSchema = new mongoose.Schema({
    name: String,
    password: String,
    email: String,
    openID: openID
});

userSchema.index({email: 1});

module.exports = mongoose.model('User', userSchema, 'users');