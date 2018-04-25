var express = require('express');
var router = express.Router();
var List = require('../models/list');
var listService = require('../services/listService');



// get all lists
router.get('/', function(req, res, next) {
    listService.getLists()
    .then(function (lists) {
        if (lists) {
            res.status(200).json(lists);
        } else {
            res.sendStatus(404);
        }
    })
    .catch(function (err) {
        console.log(err);
        res.status(400).send({error_code:1, msg:err});
    });
});


// create a list and add it to a board
router.post('/:id' /*board ID*/, function(req, res, next) {

    delete req.body._id
    var list = new Board(req.body)
    console.log('boad : ' + list);
    listService.createBoard(req.params.id , list)
    .then(function (result) {
        res.json(result);
    })
    .catch(function (err) {
        console.log(err);
        res.status(400).send({error_code:1, msg:err});
    });

});

// update list name
router.put('/:id' /*list ID*/, function(req, res, next) {
    console.log(req.body);
    listService.updateListName(req.params.id, req.body.name)
    .then(function (result) {
        res.json(result);
    })
    .catch(function (err) {
        console.log(err);
        res.status(400).send({error_code:1, msg:err});
    });
});

// add card to a list
router.put('/cards/:id', function(req, res, next) {
    console.log(req.body);
    listService.addCard(req.params.id, req.body)
    .then(function (result) {
        res.json(result);
    })
    .catch(function (err) {
        console.log(err);
        res.status(400).send({error_code:1, msg:err});
    });
});

// update card name
router.put('/cards/name/:id', function(req, res, next) {
    console.log(req.body);
    listService.updateListName(req.params.id, req.body.name)
    .then(function (result) {
        res.json(result);
    })
    .catch(function (err) {
        console.log(err);
        res.status(400).send({error_code:1, msg:err});
    });
});

// remove card from a list
router.delete('/cards/:id', function(req, res, next) {
    listService.removeList(req.params.id)
    .then(function (result) {
        res.json(result);
    })
    .catch(function (err) {
        console.log(err);
        res.status(400).send({error_code:1, msg:err});
    });
});

// remove a list from a board
router.delete('/:id' /*list ID*/, function(req, res, next) {

    listService.deleteList(req.params.id)
    .then(function (result) {
        res.json(result);
    })
    .catch(function (err) {
        console.log(err);
        res.status(400).send({error_code:1, msg:err});
    });
});

module.exports = router;