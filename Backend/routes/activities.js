var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Activity = require('../models/activity');

router.get('/:id', function (req, res, next) {
    console.log(req.params.id);
    Activity.find({object:req.params.id}, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send({ error_code: 1, msg: err });
        }
        res.status(200).json(data);
    });

});

// router.post('/', function (req, res, next) {
//     console.log(res.body);
//     let activity = new Activity(req.body);
//     activity.date = new Date();

//     activity.save((err) => {
//         if (err) {
//             console.log(err);
//             res.status(500).send({ error_code: 1, msg: err });
//         }
//         res.status(200).json({ error_code: 0 });
//     });

// });


module.exports = router;
