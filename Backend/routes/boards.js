var express = require('express');
var router = express.Router();
var Board = require('../models/board');
var boardService = require('../services/boardService');


// get all boards
router.get('/', function(req, res, next) {
    boardService.getBoards()
    .then(function (boards) {
        if (boards) {
            res.status(200).json(boards);
        } else {
            res.sendStatus(404);
        }
    })
    .catch(function (err) {
        console.log(err);
        res.status(400).send({error_code:1, msg:err});
    });
});


// get a specific board
router.get('/:id', function(req, res, next) {
    boardService.getBoard(req.params.id)
    .then(function (boards) {
        if (boards) {
            res.status(200).json(boards);
        } else {
            res.sendStatus(404);
        }
    })
    .catch(function (err) {
        console.log(err);
        res.status(400).send({error_code:1, msg:err});
    });
});

// create a board and add it to a team
router.post('/:id' /*team ID*/, function(req, res, next) {

    delete req.body._id
    var board = new Board(req.body)
    console.log('boad : ' + board);
    boardService.createBoard(req.params.id , board)
    .then(function (result) {
        res.json(result);
    })
    .catch(function (err) {
        console.log(err);
        res.status(400).send({error_code:1, msg:err});
    });

});
// update board name
router.put('/:id' /*board ID*/, function(req, res, next) {
    console.log(req.body);
    boardService.updateBoardName(req.params.id, req.body.name)
    .then(function (result) {
        res.json(result);
    })
    .catch(function (err) {
        console.log(err);
        res.status(400).send({error_code:1, msg:err});
    });
});

// add list to a board
router.put('/lists/:id', function(req, res, next) {
    console.log(req.body);
    boardService.addList(req.params.id, req.body)
    .then(function (result) {
        res.json(result);
    })
    .catch(function (err) {
        console.log(err);
        res.status(400).send({error_code:1, msg:err});
    });
});

// update list position
router.put('/lists/position/:id/', function(req, res, next) {
    console.log(req.body);
    boardService.updateListPosition(req.params.id, parseInt(req.body.newpos))
    .then(function (result) {
        res.json(result);
    })
    .catch(function (err) {
        console.log(err);
        res.status(400).send({error_code:1, msg:err});
    });
});

// update list name
router.put('/lists/name/:id', function(req, res, next) {
    console.log(req.body);
    boardService.updateListName(req.params.id, req.body.name)
    .then(function (result) {
        res.json(result);
    })
    .catch(function (err) {
        console.log(err);
        res.status(400).send({error_code:1, msg:err});
    });
});

// remove list from a board
router.delete('/lists/:id', function(req, res, next) {
    boardService.removeList(req.params.id)
    .then(function (result) {
        res.json(result);
    })
    .catch(function (err) {
        console.log(err);
        res.status(400).send({error_code:1, msg:err});
    });
});

// remove a board from a team
router.delete('/:id' /*board ID*/, function(req, res, next) {

    boardService.deleteBoard(req.params.id)
    .then(function (result) {
        res.json(result);
    })
    .catch(function (err) {
        console.log(err);
        res.status(400).send({error_code:1, msg:err});
    });
});


module.exports = router;