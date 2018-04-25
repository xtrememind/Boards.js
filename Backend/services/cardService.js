var express = require('express');
var _ = require('lodash');
var Card = require('../models/card');
var listService = require('../services/listService');
var Q = require('q');

var service = {};

service.getCards = getCards;
service.getCard = getCard;
service.createCard = createCard;
service.deleteCard = deleteCard;
service.updateCardName = updateCardName;
service.updateDueDate = updateDueDate;
service.updateDescription = updateDescription;
service.addMember = addMember;
service.removeMember = removeMember;
service.addComment = addComment;
service.removeComment = removeComment;
// service.updateCardName = updateCardName;
//service.updateListPosition = updateListPosition;


module.exports = service;

function getCards() {
    var deferred = Q.defer();
    try {
        Card.find({})
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

function getCard(id) {
    var deferred = Q.defer();
    try {
        Card.find({_id:id})
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

function createCard(listID,card) {
    console.log(card);
    var deferred = Q.defer();
    try {
        listService.addCard(listID, {_id: card._id, name:card.name, position:card.position})
            .then(function (result) {
                new Card(_.omit(card,'position')).save(function (err) {
                    if (err) deferred.reject({ error_code: 1, msg: err });
                    else deferred.resolve({ error_code: 0, _id: card._id });
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

function deleteCard(id) {
    var deferred = Q.defer();
    try {
        listService.removeList(id)
        .then(function (result) {
            Card.remove({ _id: id }, function (err) {
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

function updateCardName(id, name) {
    var deferred = Q.defer();
    try {
        console.log('id : ' + id + 'name : ' + name)
        listService.updateCardName(id, name)
        .then(function (result) {
            Card.findOneAndUpdate({ _id: id }, {$set:{'name':name}},  function (err) {
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

function updateDueDate(id, date) {
    var deferred = Q.defer();
    try {
        console.log('id : ' + id + 'date : ' + date)
        Card.findOneAndUpdate({ _id: id }, {$set:{'duedate':date}},  function (err) {
            if (err) deferred.reject({error_code:1, msg:err});
            else deferred.resolve({error_code:0, _id: id})
            });

    } catch (e) {
        deferred.reject(e.name + ': ' + e.message);
    }
    return deferred.promise;
}

function updateDescription(id, value) {
    var deferred = Q.defer();
    try {
        console.log('id : ' + id + 'value : ' + value)
        Card.findOneAndUpdate({ _id: id }, {$set:{'description':value}},  function (err) {
            if (err) deferred.reject({error_code:1, msg:err});
            else deferred.resolve({error_code:0, _id: id})
            });

    } catch (e) {
        deferred.reject(e.name + ': ' + e.message);
    }
    return deferred.promise;
}

function addMember(id,member) {
    var deferred = Q.defer();
    try {
        Card.findOneAndUpdate({ _id: id },{$push :{members: member}},{new: true}, function (err, doc) {
            if (err) deferred.reject({error_code:1, msg:err});
            else deferred.resolve({error_code:0, _id: doc.cards[doc.cards.length-1]._id})
          });
    } catch (e) {
        deferred.reject(e.name + ': ' + e.message);
    }
    return deferred.promise;
}

function removeMember(id) {
    var deferred = Q.defer();
    try {
        Card.update({'cards._id':id},{$pull :{'members':{'_id': id}}},{new: true}, function (err, doc) {
            if (err) deferred.reject({error_code:1, msg:err});
            else deferred.resolve({error_code:0})
          });
    } catch (e) {
        deferred.reject(e.name + ': ' + e.message);
    }
    return deferred.promise;
}

function addComment(id,comment) {
    var deferred = Q.defer();
    try {
        Card.findOneAndUpdate({ _id: id },{$push :{comments: comment}},{new: true}, function (err, doc) {
            if (err) deferred.reject({error_code:1, msg:err});
            else deferred.resolve({error_code:0, _id: doc.cards[doc.cards.length-1]._id})
          });
    } catch (e) {
        deferred.reject(e.name + ': ' + e.message);
    }
    return deferred.promise;
}

function removeComment(id) {
    var deferred = Q.defer();
    try {
        Card.update({'cards._id':id},{$pull :{'comments':{'_id': id}}},{new: true}, function (err, doc) {
            if (err) deferred.reject({error_code:1, msg:err});
            else deferred.resolve({error_code:0})
          });
    } catch (e) {
        deferred.reject(e.name + ': ' + e.message);
    }
    return deferred.promise;
}