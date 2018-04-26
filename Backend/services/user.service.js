var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');

var config = require('../config');
var User = require('../models/user');

var service = {};

service.create = create; // create new user
service.authenticate = authenticate; // authenticate the user
service.activate = activate; // activate the user account
service.getByJWT = getByJWT; // read the user data from JWT
service.getAll = getAll;
service.update = update; // update the user data

module.exports = service;

function create(userParam) {
    var deferred = Q.defer();

    // check if the user already in our system
    User.findOne(
        { email: userParam.email },
        (err, user) => {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (user) { // email already exists
                deferred.reject('Email "' + userParam.email + '" is already in our system!');
            } else {
                saveUser(userParam);
            }
        });

    // To save the user data after [VALIDATED DATA]
    function saveUser(userParam) {

        // remove password from user params, to be hashed (with salt length)
        var user = _.assign(new User(),  _.omit(userParam, 'password'));
        user.password = bcrypt.hashSync(userParam.password, config.saltLength);

        console.log(user);
        user.save(
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                //@TODO: generate activation token and sent it to this mail
                deferred.resolve();
            });
    }

    return deferred.promise;
}

function authenticate(email, password) {
    var deferred = Q.defer();

    User.findOne({ email: email }, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user && bcrypt.compareSync(password, user.password)) { //authenticated
            deferred.resolve({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: jwt.sign({ id: user._id }, config.secret)
            });
        } else {
            // authentication failed
            deferred.resolve();
        }
    });

    return deferred.promise;
}

//@TODO: activate the user from the sent mail token
function activate(email, token) {

}

function getByJWT(jwtToken) {
    var deferred = Q.defer();

    try {
        console.log(jwtToken);
        var userId = jwt.verify(jwtToken, config.secret).id;
        console.log(userId);
        User.findById(userId, function (err, user) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (user) {
                // return user (without hashed password)
                //@FIXME: this omit not working (or even any other functions) -- GET OVER!
                deferred.resolve(_.omit(user, 'password'));
            } else {
                // user not found
                deferred.resolve();
            }
        });
    } catch (e) {
        deferred.reject(e.name + ': ' + e.message);
    }

    return deferred.promise;
}

function getAll(){
    var deferred = Q.defer();
    try {
        User.find({})
            .exec(function(err, results) {
                console.log(results);
                if (err) deferred.reject({error_code:1, msg:err});
                else deferred.resolve(results);
            });
    } catch (e) {
        deferred.reject(e.name + ': ' + e.message);
    }
    return deferred.promise;
}


function update(_id, userParam) {
    var deferred = Q.defer();

    try {

        console.log(_id);
        User.findById(_id, function (err, user) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            console.log(user);
            if (userParam.email && user.email !== userParam.email) {
               //@TODO: see how we could update the user mail

            } else {
                // fields to update
                var set = {
                    name: userParam.name,
                };

                // update password if it was entered
                if (userParam.password) {
                    set.password = bcrypt.hashSync(userParam.password, config.saltLength);
                }

                User.update(
                    { _id: _id },
                    { $set: set },
                    function (err, doc) {
                        if (err) deferred.reject(err.name + ': ' + err.message);

                        deferred.resolve();
                    });
            }
        });
    } catch (e) {
        deferred.reject(e.name + ': ' + e.message);
    }
    return deferred.promise;
}