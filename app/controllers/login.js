var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var utils = require('../middlewares/utils.js');

module.exports = function(app) {
    app.use('/api/login', router);
};

router.post('/', function(req, res) {
    var login = {
        account: req.body.account,
        password: req.body.password
    };
    if (!login.account || !login.password) {
        res.json({
            statusCode: -1,
            message: '参数缺失'
        });
        return;
    }
    login.hashPassword = utils.hashPassword(login.password);
    User.findOne({ account: login.account })
        .exec()
        .then(function(user) {
            if (user.password === login.hashPassword) {
                req.session.l = 1;
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
        }, function(err) {
            console.error(err);
            res.json({
                statusCode: 1,
                message: '用户名或密码错误'
            });
        });
});

router.post('/adduser', function(req, res) {
    var newUser = {
        account: req.body.account,
        password: utils.hashPassword(req.body.password)
    };

    var newUserModel = new User(newUser);
    newUserModel.save()
        .then(function(doc) {
            console.log(doc);
            res.send('ok');
        }, function(err) {
            console.log(err);
            res.send(err);
        });

});
