const config = require('../config.json');
const userService = require('../services/user.service');
const Activity = require('../models/activity');

module.exports = (req, res, next) => {
    const allowIntercept = (req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE');
    const containsRoute = (config.activityUrls.some(a => a.url === req.originalUrl));

    if (allowIntercept && containsRoute) {
        intercept(req, res);
    }

    next();

    function intercept(req, res) {
        var temp = res.send;
        res.send = function () {
            temp.apply(this, arguments);
            if (res.statusCode > 199 && res.statusCode < 300) {
                logActivity(req, res, arguments[0]);
            }
        }
    }

    function logActivity(req, res, arg) {
        if (!arg) return;

        const argJson = JSON.parse(arg);
        if (!argJson || !argJson._id) return;

        const actUrl = config.activityUrls.filter(a => a.url === req.originalUrl)[0];

        getUser(req)
            .then(user => {
                if (user) {
                    saveActivity(argJson, actUrl, req, user);
                } else {
                    saveActivity(argJson, actUrl, req, {
                        name: "notfound"
                    });
                }
            }).catch(err => {
                saveActivity(argJson, actUrl, req, {
                    name: "error"
                });
            });
    }

    function getUser(req) {
        if (req.headers && req.headers.authorization) {
            return userService.getByJWT(req.headers.authorization.replace(/^Bearer\s/, ''));
        } else {
            return new Promise((resolve, reject) => {
                resolve({
                    name: "noheader"
                });
            })
        }
    }

    function saveActivity(arg, actUrl, req, user) {
        const activity = new Activity({
            objectId: arg._id,
            objectType: actUrl.objectType,
            member: {
                _id: user._id,
                name: user.name,
                email: user.email
            },
            action: req.method,
            date: new Date()
        });

        activity.save(function (err, doc) {
            console.log('err', err);
            console.log('doc', doc);
        });
    }
}