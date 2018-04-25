var express = require('express');
var Team = require('../models/team');
var userService = require('../services/user.service');
var Q = require('q');

var service = {};

service.getTeams = getTeams;
service.createTeam = createTeam;
service.updateTeamName = updateTeamName;
service.addBoard= addBoard;
service.updateBoard = updateBoard;
service.removeBoard = removeBoard;
service.addMember = addMember;
service.updateMember = updateMember;
service.removeMember = removeMember;
service.deleteTeam = deleteTeam;

module.exports = service;

function getTeams() {
    var deferred = Q.defer();
    try {
        Team.find({})
            .exec(function(err, results) {
                console.log(results);
                if (err) deferred.reject({error_code:1, msg:err});
                else deferred.resolve(results);
            });
    } catch (e) {
        deferred.reject(e.name + ': ' + e.message);
    }
    return deferred.promise;
};

function createTeam(team) {
    var deferred = Q.defer();
    try {
        console.log(team);
        team.save(function(err) {
            if (err) deferred.reject({error_code:1, msg:err});
            else deferred.resolve({error_code:0, _id: team._id});
        });
    } catch (e) {
        deferred.reject(e.name + ': ' + e.message);
    }
    return deferred.promise;
}

function updateTeamName(id, name) {
    var deferred = Q.defer();
    try {
        Team.findOneAndUpdate({ _id: id }, {$set:{'name':name}},  function (err) {
            if (err) deferred.reject({error_code:1, msg:err});
            else deferred.resolve({error_code:0, _id: id})
          });
    } catch (e) {
        deferred.reject(e.name + ': ' + e.message);
    }
    return deferred.promise;
}

function addBoard(id, board) {
    var deferred = Q.defer();
    try {
        Team.findOneAndUpdate({ _id: id },{$push :{boards: board}},{new: true}, function (err, doc) {
            if (err) deferred.reject({error_code:1, msg:err});
            else deferred.resolve({error_code:0, _id: doc.boards[doc.boards.length-1]._id})
          });
    } catch (e) {
        deferred.reject(e.name + ': ' + e.message);
    }
    return deferred.promise;
}

function removeBoard(id) {
    var deferred = Q.defer();
    try {
        Team.findOneAndUpdate({'boards._id':id},{$pull :{'boards':{'_id': id}}},{new: true}, function (err, doc) {
            if (err) deferred.reject({error_code:1, msg:err});
            else deferred.resolve({error_code:0})
          });
    } catch (e) {
        deferred.reject(e.name + ': ' + e.message);
    }
    return deferred.promise;
}

function updateBoard(id, name) {
    var deferred = Q.defer();
    console.log(id + ' ' + name)
    try {
        Team.findOneAndUpdate({'boards._id': id},{'$set':{'boards.$.name': name}}
        ,{new: true}, function (err, doc) {
            if (err) deferred.reject({error_code:1, msg:err});
            else deferred.resolve({error_code:0, _id: id})
          });
    } catch (e) {
        deferred.reject(e.name + ': ' + e.message);
    }
    return deferred.promise;
}

function addMember(id, member) {
    var deferred = Q.defer();
    try {
        Team.findOneAndUpdate({ _id: id },{$push :{members: member}},{new: true}, function (err, doc) {
            if (err) deferred.reject({error_code:1, msg:err});
            else deferred.resolve({error_code:0, _id: doc.members[doc.members.length-1]._id})
          });
    } catch (e) {
        deferred.reject(e.name + ': ' + e.message);
    }
    return deferred.promise;
}

function updateMember(id, name) {
    var deferred = Q.defer();
    console.log(id + ' ' + name)
    try {
        Team.findOneAndUpdate({'members._id': id},{'$set':{'members.$.name': name}}
        ,{new: true}, function (err, doc) {
            if (err) deferred.reject({error_code:1, msg:err});
            else deferred.resolve({error_code:0, _id: id})
          });
    } catch (e) {
        deferred.reject(e.name + ': ' + e.message);
    }
    return deferred.promise;
}

function removeMember(id) {
    var deferred = Q.defer();
    try {
        Team.findOneAndUpdate({'members.+id': id},{$pull :{'members':{'_id': id}}},{new: true}, function (err, doc) {
            if (err) deferred.reject({error_code:1, msg:err});
            else deferred.resolve({error_code:0})
          });
    } catch (e) {
        deferred.reject(e.name + ': ' + e.message);
    }
    return deferred.promise;
}

function deleteTeam(id) {
    var deferred = Q.defer();
    try {
        Team.remove({ _id: id }, function (err) {
            if (err) deferred.reject({error_code:1, msg:err});
            else deferred.resolve({error_code:0})
          });
    } catch (e) {
        deferred.reject(e.name + ': ' + e.message);
    }
    return deferred.promise;
}