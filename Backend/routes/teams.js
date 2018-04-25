var express = require('express');
var router = express.Router();
var Team = require('../models/team');
var teamService = require('../services/teamService');

// get all teams
router.get('/', function(req, res, next) {
    teamService.getTeams()
    .then(function (teams) {
        if (teams) {
            res.status(200).json(teams);
        } else {
            res.sendStatus(404);
        }
    })
    .catch(function (err) {
        console.log(err);
        res.status(400).send({error_code:1, msg:err});
    });
});

// get a team
router.get('/:id', function(req, res, next) {
    teamService.getTeam(req.params.id)
    .then(function (teams) {
        if (teams) {
            res.status(200).json(teams);
        } else {
            res.sendStatus(404);
        }
    })
    .catch(function (err) {
        console.log(err);
        res.status(400).send({error_code:1, msg:err});
    });
});

//create team
router.post('/', function(req, res, next) {
    delete req.body._id
    var team = new Team(req.body)
    teamService.createTeam(team)
    .then(function (result) {
        res.json(result);
    })
    .catch(function (err) {
        console.log(err);
        res.status(400).send({error_code:1, msg:err});
    });
});

// update team name
router.put('/:id', function(req, res, next) {
    console.log(req.body);
    teamService.updateTeamName(req.params.id, req.body.name)
    .then(function (result) {
        res.json(result);
    })
    .catch(function (err) {
        console.log(err);
        res.status(400).send({error_code:1, msg:err});
    });

});

// add board to a team
router.put('/boards/:id', function(req, res, next) {
    console.log(req.body);
    teamService.addBoard(req.params.id, req.body)
    .then(function (result) {
        res.json(result);
    })
    .catch(function (err) {
        console.log(err);
        res.status(400).send({error_code:1, msg:err});
    });
});

// update board name
router.put('/boards/name/:id', function(req, res, next) {
    console.log(req.body);
    teamService.updateBoard(req.params.id, req.body.name)
    .then(function (result) {
        res.json(result);
    })
    .catch(function (err) {
        console.log(err);
        res.status(400).send({error_code:1, msg:err});
    });
});

// remove board from a team
router.delete('/boards/:id', function(req, res, next) {
    teamService.removeBoard(req.params.id)
    .then(function (result) {
        res.json(result);
    })
    .catch(function (err) {
        console.log(err);
        res.status(400).send({error_code:1, msg:err});
    });
});

// add member to a team
router.put('/members/:id', function(req, res, next) {
    console.log(req.body);
    teamService.addMember(req.params.id, req.body)
    .then(function (result) {
        res.json(result);
    })
    .catch(function (err) {
        console.log(err);
        res.status(400).send({error_code:1, msg:err});
    });
});

// update member name
router.put('/members/name/:id', function(req, res, next) {
    console.log(req.body);
    teamService.updateMember(req.params.id, req.body.name)
    .then(function (result) {
        res.json(result);
    })
    .catch(function (err) {
        console.log(err);
        res.status(400).send({error_code:1, msg:err});
    });
});


// remove member from a team
router.delete('/members/:id', function(req, res, next) {
    teamService.removeMember(req.params.id)
    .then(function (result) {
        res.json(result);
    })
    .catch(function (err) {
        console.log(err);
        res.status(400).send({error_code:1, msg:err});
    });
});

// delete team
router.delete('/:id', function(req, res, next) {
    teamService.deleteTeam(req.params.id)
    .then(function (result) {
        res.json(result);
    })
    .catch(function (err) {
        console.log(err);
        res.status(400).send({error_code:1, msg:err});
    });
});

module.exports = router;