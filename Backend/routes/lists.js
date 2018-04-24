var express = require('express');
var router = express.Router();
var Team = require('../models/team');
var userService = require('../services/user.service');


// add a list to a board
router.post('/:boardId', function(req, res, next) {

    Team.update({"boards._id": req.params.boardId},{$push: {"boards.$.lists": req.body}}
    ,{new: true}, function (err, doc) {
        if (err) res.status(500).send({error_code:1, msg:err});
        else res.status(200).json({error_code:0})
      });
});

// update a list
router.put('/:id' /*list ID*/, function(req, res, next) {
    var team;
    Team.find({'lists._id': req.params.id}, function (err, doc) {
        if (err) res.status(500).send({error_code:1, msg:err});
        else {
                team= new Team(doc).boards
            };

    });       

    Team.boards.update({'lists._id': req.params.id},{'$set':{'lists.$.name':'hi'}}
    ,{new: true}, function (err, doc) {
        if (err) res.status(500).send({error_code:1, msg:err});
        else res.status(200).json({error_code:0, _id: req.params.id})
      });
});

// remove a list from a board
router.delete('/:id' /*list ID*/, function(req, res, next) {

    Team.findOneAndUpdate({}, {$pull :{'lists':{'_id': req.params.id}}},  function (err) {
        if (err) res.status(500).send({error_code:1, msg:err});
        else res.status(200).json({error_code:0})
      });
});

module.exports = router;