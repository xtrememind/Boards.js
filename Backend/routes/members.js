var express = require('express');
var router = express.Router();
var Team = require('../models/team');
var userService = require('../services/user.service');

// remove a member from a team
router.delete('/:id' /*member ID*/, function(req, res, next) {

    Team.findOneAndUpdate({}, {$pull :{'members':{'_id': req.params.id}}},  function (err) {
        if (err) res.status(500).send({error_code:1, msg:err});
        else res.status(200).json({error_code:0})
      });
});


// add a member to a team
router.post('/:id' /*team ID*/, function(req, res, next) {

    Team.findOneAndUpdate({ _id: req.params.id }, {$push :{members: req.body}},  function (err) {
        if (err) res.status(500).send({error_code:1, msg:err});
        else res.status(200).json({error_code:0})
      });
});
module.exports = router;