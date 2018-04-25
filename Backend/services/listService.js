var express = require('express');
var _ = require('lodash');
var List = require('../models/list');
var boardService = require('../services/boardService');
var Q = require('q');

var service = {};

service.getLists = getLists;
service.getList = getList;
service.createList = createList;
service.updateListName = updateListName;
service.deleteList = deleteList;
service.addCard = addCard;
service.updateCardName = updateCardName;
//service.updateListPosition = updateListPosition;
service.removeCard = removeCard;

module.exports = service;

function getLists() {
    var deferred = Q.defer();
    try {
        List.find({})
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

function getList(id) {
    var deferred = Q.defer();
    try {
        List.find({_id:id})
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

function createList(boardID,list) {
    console.log(list);
    var deferred = Q.defer();
    try {
        boardService.addList(boardID, {_id: list._id, position:list.position, name:list.name})
            .then(function (result) {
                console.log('list: '+list)
                new List(_.omit(list, 'position')).save(function (err) {
                    if (err) deferred.reject({ error_code: 1, msg: err });
                    else deferred.resolve({ error_code: 0, _id: list._id });
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

function updateListName(id, name) {
    var deferred = Q.defer();
    try {
        console.log('id : ' + id + 'name : ' + name)
        boardService.updateListName(id, name)
        .then(function (result) {
            List.findOneAndUpdate({ _id: id }, {$set:{'name':name}},  function (err) {
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

function deleteList(id) {
    var deferred = Q.defer();
    try {
        boardService.removeList(id)
        .then(function (result) {
            List.remove({ _id: id }, function (err) {
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


function addCard(id,card) {
    var deferred = Q.defer();
    try {
        List.findOneAndUpdate({ _id: id },{$push :{cards: card}},{new: true}, function (err, doc) {
            if (err) deferred.reject({error_code:1, msg:err});
            else deferred.resolve({error_code:0, _id: doc.cards[doc.cards.length-1]._id})
          });
    } catch (e) {
        deferred.reject(e.name + ': ' + e.message);
    }
    return deferred.promise;
}

function updateCardName(id, name) {
    var deferred = Q.defer();
    console.log(id + ' ' + name)
    try {
        List.findOneAndUpdate({'cards._id': id},{'$set':{'cards.$.name': name}}
        ,{new: true}, function (err, doc) {
            if (err) deferred.reject({error_code:1, msg:err});
            else deferred.resolve({error_code:0, _id: id})
          });
    } catch (e) {
        deferred.reject(e.name + ': ' + e.message);
    }
    return deferred.promise;
}

function removeCard(id) {
    var deferred = Q.defer();
    try {
        List.update({'cards._id':id},{$pull :{'cards':{'_id': id}}},{new: true}, function (err, doc) {
            if (err) deferred.reject({error_code:1, msg:err});
            else deferred.resolve({error_code:0})
          });
    } catch (e) {
        deferred.reject(e.name + ': ' + e.message);
    }
    return deferred.promise;
}