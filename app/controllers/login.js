var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var utils = require('../middlewares/utils.js');

module.exports = function (app) {
    app.use('/api', router);
};

router.post('/login', function (req, res) {
    var login = {
        account: req.body.account,
        password: req.body.password
    };
    if (!login.account || !login.password) {
        res.json({
            statusCode: -1,
            message: '用户名或密码为空'
        });
        return;
    }
    login.hashPassword = utils.hashPassword(login.password);
    User.findOne({
            account: login.account,
            isLogoff: 0
        })
        .exec()
        .then(function (user) {
            if (user === null) {
                res.json({
                    statusCode: 1,
                    message: '用户名或密码错误'
                });
                return;
            }
            if (user.password === login.hashPassword) {
                req.session.l = 1;
                req.session.user = user;
                res.json({
                    statusCode: 0,
                    message: '登录成功'
                });
            } else {
                res.json({
                    statusCode: 1,
                    message: '用户名或密码错误'
                });
            }
        }, function (err) {
            console.log(err);
            res.json({
                statusCode: 1,
                message: '用户名或密码错误'
            });
        });
});

router.post('/logout', function (req, res) {
    if (req.session.l === 1) {
        req.session.destroy(function (err) {
            if (err) {
                console.error(err);
                res.json({
                    statusCode: -1,
                    message: ''
                });
            } else {
                res.json({
                    statusCode: 0,
                    message: '成功'
                });
            }
        });
    } else {
        res.json({
            statusCode: 0,
            message: '成功'
        });
    }
});
