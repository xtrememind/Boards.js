const config = require('../config.json');
const userService = require('../services/user.service');
const Activity = require('../models/activity');

module.exports = (req, res, next) => {
    if (!config.activityUrls) {
        next();
        return;
    }

    const allowIntercept = (req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE');
    const containsRoute = (config.activityUrls.some(a => sameUrl(a.url, req.originalUrl)));

    if (allowIntercept && containsRoute) {
        intercept(req, res);
    }

    next();
}

function sameUrl(actUrl, orgUrl) {
    const act = actUrl.split('/');
    const org = orgUrl.split('/');
    if (act.length != org.length) return false;

    for (let i = 0; i < org.length; i++) {
        if (act[i] == org[i]) continue;
        if (act[i][0] === ':') continue;
        return false;
    }

    return true;
}

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
    let objectId = null;

    if (req.method === 'DELETE') {
        objectId = Array.from(req.originalUrl.split('/')).pop();
    } else {
        if (!arg) return;
        const argJson = JSON.parse(arg);
        if (!argJson || !argJson._id) return;
        objectId = argJson._id;
    }

    const actUrl = config.activityUrls.filter(a => sameUrl(a.url, req.originalUrl))[0];

    getUser(req)
        .then(user => {
            if (user) {
                saveActivity(objectId, actUrl, req, user);
            } else {
                saveActivity(objectId, actUrl, req, {
                    name: "notfound"
                });
            }
        }).catch(err => {
            saveActivity(objectId, actUrl, req, {
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

function saveActivity(objectId, actUrl, req, user) {
    const activity = new Activity({
        object: objectId,
        objectType: actUrl.objectType,
        member: {
            _id: user._id,
            name: user.name,
            email: user.email
        },
        action: req.method,
        date: new Date()
    });

    activity.save(function (err, doc) {});
}