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

// update card name
router.put('/name/:id' /*card ID*/, function(req, res, next) {
    console.log(req.body);
    cardService.updateCardName(req.params.id, req.body.name)
    .then(function (result) {
        res.json(result);
    })
    .catch(function (err) {
        console.log(err);
        res.status(400).send({error_code:1, msg:err});
    });
});

// update card Description
router.put('/description/:id' /*card ID*/, function(req, res, next) {
    console.log(req.body);
    cardService.updateDescription(req.params.id, req.body.description)
    .then(function (result) {
        res.json(result);
    })
    .catch(function (err) {
        console.log(err);
        res.status(400).send({error_code:1, msg:err});
    });
});

// update card dueDate
router.put('/duedate/:id' /*card ID*/, function(req, res, next) {
    console.log(req.body);
    cardService.updateDueDate(req.params.id, req.body.dueDate)
    .then(function (result) {
        res.json(result);
    })
    .catch(function (err) {
        console.log(err);
        res.status(400).send({error_code:1, msg:err});
    });
});

// delete a card
router.delete('/:id' /*Card ID*/, function(req, res, next) {

    cardService.deleteCard(req.params.id)
    .then(function (result) {
        res.json(result);
    })
    .catch(function (err) {
        console.log(err);
        res.status(400).send({error_code:1, msg:err});
    });
});

// add member to a card
router.put('/members/:id' /*Card Id*/, function(req, res, next) {
    console.log(req.body);
    cardService.addMember(req.params.id, req.body)
    .then(function (result) {
        res.json(result);
    })
    .catch(function (err) {
        console.log(err);
        res.status(400).send({error_code:1, msg:err});
    });
});

// add comment to a card
router.put('/comments/:id' /*Card Id*/, function(req, res, next) {
    console.log(req.body);
    cardService.addComment(req.params.id, req.body)
    .then(function (result) {
        res.json(result);
    })
    .catch(function (err) {
        console.log(err);
        res.status(400).send({error_code:1, msg:err});
    });
});

// remove member from a card
router.delete('/:id/members/:memberId', function(req, res, next) {
    cardService.removeMember(req.params.id, req.params.memberId)
    .then(function (result) {
        res.json(result);
    })
    .catch(function (err) {
        console.log(err);
        res.status(400).send({error_code:1, msg:err});
    });
});

// remove comment from a card
router.delete('/comments/:id', function(req, res, next) {
    cardService.removeComment(req.params.id)
    .then(function (result) {
        res.json(result);
    })
    .catch(function (err) {
        console.log(err);
        res.status(400).send({error_code:1, msg:err});
    });
});

module.exports = router;