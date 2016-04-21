var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var utils = require('../middlewares/utils.js');

module.exports = function (app) {
    app.use('/api/user', router);
};

router.post('/', function (req, res) {
    var account = req.body.account;
    var password = req.body.password;
    var name = req.body.name;
    var sex = req.body.sex;
    
    if(req.session.l !== 1){
        res.json({
            statusCode:2,
            message: '请先登录'
        });
        return;
    };
    
    if (!account || !password || name === '' || sex === '') {
        res.json({
            statusCode: 1,
            message: '确实必要参数'
        });
        return;
    }

    if (!checkLength(account, 5, 15)
        || !checkLength(password, 5, 15)
        || !/[0,1]/g.test(sex)
    ) {
        res.json({
            statusCode: 1,
            message: '参数不符合要求'
        });
        return;
    }

    function getNewUser() {
        var user = {
            account: account,
            password: utils.hashPassword(password),
            name: name,
            sex: sex,
            addByUser: req.session.user._id
        };
        var optionValue = ['postion', 'address', 'phone', 'birthday'];

        optionValue.forEach(function (key) {
            var value = req.body[key];
            if (value !== '' && value !== undefined && value !== null) {
                user[key] = value;
            }
        });
        console.log(user);
        return user;
    }

    User.findOne({ account: account })
        .exec()
        .then(function (user) {
            if (user === null) {
                console.log(getNewUser());
                var newUser = new User(getNewUser());
                return newUser.save();
            } else {
                return null;
            }
        })
        .then(function (user) {
            if (user === null) {
                res.json({
                    statusCode: 1,
                    message: '用户名重复'
                });
            } else {
                res.json({
                    statusCode: 0,
                    message: '添加成功'
                });
            }
        })
        .catch(function (err) {
            console.log(err);
            res.json({
                statusCode: -1,
                message: '服务出错'
            });
        });

});

function checkLength(str, min, max) {
    var len = str.length;
    return len >= min && len <= max;
}