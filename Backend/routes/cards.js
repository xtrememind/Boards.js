var express = require('express');
var router = express.Router();
var Team = require('../models/team')
var userService = require('../services/user.service');


// get all cards in a team
router.get('/:id', function(req, res, next) {
    Team.find({_id: req.params.teamid})
        .exec(function(err, results) {
            console.log(results)
            if (err) res.status(500).send({error_code:1, msg:err});
            else res.status(200).json(results)
        })
});

//create a new card
router.put('/:id' /* Task ID */, function(req, res, next) {
    var card = new Team(req.body)
    console.log(req.body)
    console.log(card)
    Team.findOneAndUpdate({ _id: req.params.id }, {$push :{tasks: task}},  function (err) {
        if (err) res.status(500).send({error_code:1, msg:err});
        else res.status(200).json({error_code:0, _id: card._id})
      });
});

//update a card
router.put('/:id' /* Card ID */, function(req, res, next) {
    var card = new Team(req.body)
    console.log(req.body)
    console.log(card)
    Team.findOneAndUpdate({ _id: req.params.id }, card,  function (err) {
        if (err) res.status(500).send({error_code:1, msg:err});
        else res.status(200).json({error_code:0, _id: card._id})
      });
});

// delete a card
router.delete('/:id' /* team ID */, function(req, res, next) {
    var card = req.body
    Team.findOneAndUpdate({ _id: req.params.id }, {$pull :{cards: card}},  function (err) {
        if (err) res.status(500).send({error_code:1, msg:err});
        else res.status(200).json({error_code:0, _id: card._id})
      });
});