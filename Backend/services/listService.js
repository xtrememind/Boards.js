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
service.updateCardDueDate = updateCardDueDate;
service.updateCardPosition = updateCardPosition;
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
        newList = new List(_.omit(list, 'position'));
        newList.save(function (err) {
            if (err) deferred.reject({ error_code: 1, msg: err });
            else{
                boardService.addList(boardID, {_id: newList.id, position:list.position, name:list.name})
                .then(function (result) {
                    deferred.resolve({ error_code: 0, _id: newList.id});
                })
                .catch(function (err) {
                    console.log(err);
                    deferred.reject({ error_code: 1, msg: err });
                });
            }
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

function updateCardDueDate(id, date) {
    var deferred = Q.defer();
    console.log(id + ' ' + date)
    try {
        List.findOneAndUpdate({'cards._id': id},{'$set':{'cards.$.dueDate': date}}
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
    let deferred = Q.defer();
    try {
        console.log('about to remove a card');
        List.update({'cards._id':id},{$pull :{'cards':{'_id': id}}},{new: true}, function (err, doc) {
            if (err) deferred.reject({error_code:1, msg:err});
            else {
                console.log('card removed');
                deferred.resolve({error_code:0});
                }
          });
    } catch (e) {
        deferred.reject(e.name + ': ' + e.message);
    }
    return deferred.promise;
}


function updateCardPosition(cardId, oldListID, newListID, newPos) {
    var deferred = Q.defer();
    try {
        let card;
        getList(oldListID)
        .then(function (oldList) {
            console.log('got the list' + oldList)
            if (oldList) {
                for (let i =0; i < oldList[0].cards.length; i++)
                {
                    if (oldList[0].cards[i]._id.toString()=== cardId)
                    {
                        card = oldList[0].cards[i];
                    }
                }
                console.log('got the old card' + card);
                console.log('input card ID ' + cardId);
                removeCard(cardId)
                .then(function (result) {
                    card.position = newPos;
                    console.log('got the updated card' + card);
                    getList(newListID)
                    .then(function (newList) {
                        console.log('got the the new list cards' + newList);
                        let newCards = newList[0].cards;
                        console.log('got the new cards before update ' + newCards);
                        for (let x = 0; x < newCards.length; x++){
                            if (newCards[x].position >= card.position ) newCards[x].position ++;
                        }
                        newCards.push(card);
                        console.log('got the final list of cards' + newCards);
                        let balancedCards = balanceCards(newCards);
                        List.findOneAndUpdate({'_id': newListID},{$set :{'cards':balancedCards}},{new: true}, function (err, doc) {
                            if (err) deferred.reject({error_code:1, msg:err});
                            else deferred.resolve({error_code:0})
                        });
                        deferred.resolve({error_code:0});
                    });
                });
            }
        });
    } catch (e) {
        deferred.reject(e.name + ': ' + e.message);
    }
    return deferred.promise;
}
function balanceCards(cards){
    function compare(a,b) {
        if (a.position < b.position)
          return -1;
        if (a.position > b.position)
          return 1;
        return 0;
      };
      cards.sort(compare);
      for (let i = 0; i < cards.length; i++){
        cards[i].position = i;
      };
      console.log('sorted cards: ' + cards)
      return cards;
}
