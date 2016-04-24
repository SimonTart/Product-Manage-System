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
            statusCode: -9,
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
        var optionValue = ['postion', 'address', 'phone', 'birthday','authority'];

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

router.get('/',function(req,res){
    const stepLength = 25;
    const page = req.query.page ? req.query.page:0;
    if(req.session.l !== 1){
        res.json({
            statusCode: -9,
            message: '请先登录'
        });
        return;
    }
    if(req.session.user.authority.indexOf(5) === -1){
        res.json({
            statusCode: -8,
            message: '无权限'
        });
        return;
    }
    User.find()
        .skip(page*stepLength)
        .limit(stepLength)
        .select('_id account name sex phone position address')
        .exec()
        .then(function(users){
            res.json({
                statusCode: 0,
                users: users
            });
        })
        .catch(function (err) {
            console.error(err);
            res.json({
                statusCode: -1,
                message: '查询失败'
            });
        });

});
router.post('/isAccountRepeat',function (req,res) {
    var account = req.body.account;
    if(req.session.l !== 1){
        res.json({
            statusCode: -9,
            message: '请先登录'
        });
        return;
    }
    if(req.session.user.authority.indexOf(6) === -1){
        res.json({
           statusCode: -8 ,
            message: '权限不够'
        });
        return;
    }
    if(account === ''){
        res.json({
            statusCode: 1,
            message: '缺少必要参数'
        });
        return;
    }
    User.findOne({account:account})
        .exec()
        .then(function (user) {
            if(user !== null ){
                res.json({
                    statusCode: 0,
                    message: '账号已被占用',
                    resultCode: 0
                });
            }else{
                res.json({
                    statusCode: 0,
                    message: '账号可用',
                    resultCode: 1
                });
            }

        })
        .catch(function (err) {
           console.error(err);
            res.json({
                statusCode: -1,
                message: '服务暂时不可用'
            });
        });
});
function checkLength(str, min, max) {
    var len = str.length;
    return len >= min && len <= max;
}