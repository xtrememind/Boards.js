var express = require('express');
var router = express.Router();
const {
    check,
    validationResult
} = require('express-validator/check');

var userService = require('../services/user.service');
var config = require('../config.json');

module.exports = router;

const registerChecker = [
    check('email', 'email is required').exists(),
    check('email')
    .isEmail().withMessage('must be an email')
    .trim()
    .normalizeEmail(),

    check('password', 'passwords must be at least 5 chars long and contain one number')
    .isLength({
        min: config.passwordMinLength
    })
    .matches(/\d/)
];
const authChecker = [
    check('email')
    .isEmail().withMessage('Invalid email!')
    .trim()
    .normalizeEmail()
];

router.post('/auth', authChecker, authenticate);
router.post('/register', registerChecker, register);
router.get('/user', getUser); //this read the user from his token
router.get('/', getAll);
router.put('/:_id', update);

module.exports = router;


function authenticate(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }
    console.log(req.body);
    userService.authenticate(req.body.email, req.body.password)
        .then(function (user) {
            if (user) { //authenticated
                res.send(user);
            } else {
                res.status(400).send({
                    errors: [{
                        msg: 'Email or password is incorrect'
                    }]
                });
            }
        })
        .catch(function (err) {
            res.status(400).send({
                errors: [{
                    msg: err
                }]
            });
        });
}

function register(req, res) {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }
    userService.create(req.body)
        .then(function () {
            res.json({
                error_code: 0
            });
        })
        .catch(function (err) {
            res.status(400).json({
                errors: [{
                    msg: err
                }]
            });
        });
}

function getUser(req, res) {
    if (req.headers && req.headers.authorization) {
        userService.getByJWT(req.headers.authorization.replace(/^Bearer\s/, ''))
            .then(function (user) {
                if (user) {
                    res.send(user);
                } else {
                    res.sendStatus(404);
                }
            })
            .catch(function (err) {
                res.status(400).send({
                    error_code: 1,
                    msg: err
                });
            });
    } else {
        res.status(400).send({
            error_code: 1,
            msg: "Not authorized!"
        });
    }
}

function getAll(req, res) {
    userService.getAll().then(function (users) {
        for(const user of users){
            user.password = '';
        }
        res.send(users);
    }).catch(function (err) {
        res.status(400).send({
            error_code: 1,
            msg: err
        });
    })
}

function update(req, res) {
    userService.update(req.params._id, req.body)
        .then(function () {
            res.json({
                error_code: 0
            });
        })
        .catch(function (err) {
            res.status(400).send({
                error_code: 1,
                msg: err
            });
        });
}