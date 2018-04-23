var express = require('express');
var router = express.Router();
var Team = require('../models/team');
var userService = require('../services/user.service');

// get all teams
router.get('/', function(req, res, next) {
    Team.find({})
        .exec(function(err, results) {
            console.log(results)
            if (err) res.status(500).send({error_code:1, msg:err});
            else res.status(200).json(results)
        })
});

// // find a team
// router.get('/:id', function(req, res, next) {
//     Team.find({_id: req.params.id})
//         .exec(function(err, results) {
//             console.log(results)
//             if (err) res.status(500).send({error_code:1, msg:err});
//             else res.status(200).json(results)
//         })
// });

//create team
router.post('/', function(req, res, next) {
    delete req.body._id
    var team = new Team(req.body)
    console.log(req.body)
    console.log(team)
    team.save(function(err) {
        if (err) res.status(500).send({error_code:1, msg:err});
        else res.status(200).json({error_code:0, _id: team._id})
    })
});

// // update team
// router.put('/:id', function(req, res, next) {
//     var team = new Team(req.body)
//     team.updateDate = new Date();
//     console.log(req.body)
//     console.log(team)

//     Team.findOneAndUpdate({ _id: req.params.id }, team,  function (err) {
//         if (err) res.status(500).send({error_code:1, msg:err});
//         else res.status(200).json({error_code:0, _id: team._id})
//       });
// });

// // delete team
// router.delete('/:id', function(req, res, next) {
//     Team.remove({ _id: req.params.id }, function (err) {
//         if (err) res.status(500).send({error_code:1, msg:err});
//         else res.status(200).json({error_code:0})
//       });
// });

module.exports = router;