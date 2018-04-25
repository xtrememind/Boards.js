var express = require('express');
var router = express.Router();
var Card = require('../models/card');
var cardService = require('../services/cardService');


// get all cards
router.get('/', function(req, res, next) {
    cardService.getCards()
    .then(function (cards) {
        if (cards) {
            res.status(200).json(cards);
        } else {
            res.sendStatus(404);
        }
    })
    .catch(function (err) {
        console.log(err);
        res.status(400).send({error_code:1, msg:err});
    });
});

// get a specific card
router.get('/:id', function(req, res, next) {
    cardService.getCard(req.params.id)
    .then(function (card) {
        if (card) {
            res.status(200).json(card);
        } else {
            res.sendStatus(404);
        }
    })
    .catch(function (err) {
        console.log(err);
        res.status(400).send({error_code:1, msg:err});
    });
});

// create a card and add it to a list
router.post('/:id' /*list ID*/, function(req, res, next) {
    console.log(req.body)
    delete req.body._id
    // var list = new List(req.body)
    cardService.createCard(req.params.id , req.body)
    .then(function (result) {
        res.json(result);
    })
    .catch(function (err) {
        console.log(err);
        res.status(400).send({error_code:1, msg:err});
    });
});

// //update a card
// router.put('/:id' /* Card ID */, function(req, res, next) {

// });

// // delete a card
// router.delete('/:id' /* team ID */, function(req, res, next) {

// });

module.exports = router;