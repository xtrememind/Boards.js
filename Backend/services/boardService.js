var express = require('express');
var Team = require('../models/team');
var Board = require('../models/board');
var teamService = require('../services/teamService');
var Q = require('q');

var service = {};

service.getBoards = getBoards;
service.getBoard = getBoard;
service.createBoard = createBoard;
service.updateBoardName = updateBoardName;
service.deleteBoard = deleteBoard;
service.addList = addList;
service.updateListName = updateListName;
service.updateListPosition = updateListPosition;
service.removeList = removeList;

module.exports = service;

function getBoards() {
    var deferred = Q.defer();
    try {
        Board.find({})
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

function getBoard(id) {
    var deferred = Q.defer();
    try {
        Board.find({_id: id})
            .exec(function(err, result) {
                console.log(result);
                if (err) deferred.reject({error_code:1, msg:err});
                else deferred.resolve(result);
            });
    } catch (e) {
        deferred.reject(e.name + ': ' + e.message);
    }
    return deferred.promise;
};

function createBoard(teamID,board) {
    console.log(board);
    var deferred = Q.defer();
    try {
        teamService.addBoard(teamID, {_id: board._id, name:board.name})
            .then(function (result) {
                board.save(function (err) {
                    if (err) deferred.reject({ error_code: 1, msg: err });
                    else deferred.resolve({ error_code: 0, _id: board._id });
                });
            })
            .catch(function (err) {
                console.log(err);
                deferred.reject({ error_code: 1, msg: err });
            });
    } catch (e) {
        deferred.reject(e.name + ': ' + e.message);
    }
    return deferred.promise;
}

function updateBoardName(id, name) {
    var deferred = Q.defer();
    try {
        console.log('id : ' + id + 'name : ' + name)
        teamService.updateBoard(id, name)
        .then(function (result) {
            Board.findOneAndUpdate({ _id: id }, {$set:{'name':name}},  function (err) {
                if (err) deferred.reject({error_code:1, msg:err});
                else deferred.resolve({error_code:0, _id: id})
              });
        })
        .catch(function (err) {
            console.log(err);
            deferred.reject({error_code:1, msg:err});
        });
    } catch (e) {
        deferred.reject(e.name + ': ' + e.message);
    }
    return deferred.promise;
}

function deleteBoard(id) {
    var deferred = Q.defer();
    try {
        teamService.removeBoard(id)
        .then(function (result) {
            Board.remove({ _id: id }, function (err) {
                if (err) deferred.reject({error_code:1, msg:err});
                else deferred.resolve({error_code:0})
              });
        })
        .catch(function (err) {
            console.log(err);
            deferred.reject({error_code:1, msg:err});
        });
    } catch (e) {
        deferred.reject(e.name + ': ' + e.message);
    }
    return deferred.promise;
}


function addList(id,list) {
    var deferred = Q.defer();
    try {
        Board.findOneAndUpdate({ _id: id },{$push :{lists: list}},{new: true}, function (err, doc) {
            if (err) deferred.reject({error_code:1, msg:err});
            else deferred.resolve({error_code:0, _id: doc.lists[doc.lists.length-1]._id})
          });
    } catch (e) {
        deferred.reject(e.name + ': ' + e.message);
    }
    return deferred.promise;
}

function updateListName(id, name) {
    var deferred = Q.defer();
    console.log(id + ' ' + name)
    try {
        Board.findOneAndUpdate({'lists._id': id},{'$set':{'lists.$.name': name}}
        ,{new: true}, function (err, doc) {
            if (err) deferred.reject({error_code:1, msg:err});
            else deferred.resolve({error_code:0, _id: id})
          });
    } catch (e) {
        deferred.reject(e.name + ': ' + e.message);
    }
    return deferred.promise;
}

function removeList(id) {
    var deferred = Q.defer();
    try {
        Board.findOneAndUpdate({'lists._id': id},{$pull :{'lists':{'_id': id}}},{new: true}, function (err, doc) {
            if (err) deferred.reject({error_code:1, msg:err});
            else deferred.resolve({error_code:0})
          });
    } catch (e) {
        deferred.reject(e.name + ': ' + e.message);
    }
    return deferred.promise;
}

function updateListPosition(id, newPos) {
    var deferred = Q.defer();
    try {
        Board.find({'lists._id': id})
        .exec(function(err, result) {
            // console.log(result[0].lists);
            if (err) deferred.reject({error_code:1, msg:err});
            let listArr = result[0].lists;
            console.log(listArr);
            let oldPos = -1;
            for (let i = 0; i < listArr.length; i++){
                if (listArr[i]._id.toString() === id){
                    oldPos = listArr[i].position;
                }                
            }
            let shiftFlag = false;
            for (let i = 0; i < listArr.length; i++){
                if (listArr[i]._id.toString() === id){
                    listArr[i].position = newPos;
                }
                else if (listArr[i].position > oldPos && listArr[i].position <= newPos) listArr[i].position --;
                else if (listArr[i].position < oldPos && listArr[i].position >= newPos) listArr[i].position ++;
            }
            console.log(listArr);
            Board.findOneAndUpdate({'lists._id': id},{$set :{'lists':listArr}},{new: true}, function (err, doc) {
                if (err) deferred.reject({error_code:1, msg:err});
                else deferred.resolve({error_code:0})
            });
            deferred.resolve({error_code:0});
        });
    } catch (e) {
        deferred.reject(e.name + ': ' + e.message);
    }
    return deferred.promise;
}
