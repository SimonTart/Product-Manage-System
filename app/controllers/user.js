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

    if (req.session.l !== 1) {
        res.json({
            statusCode: -9,
            message: '请先登录'
        });
        return;
    };

    if (req.session.user.authority.indexOf(6) === -1) {
        res.json({
            statusCode: -8,
            message: '无权限'
        });
        return;
    }
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
            addByUser: req.session.user._id,
            modifyByUser: req.session.user._id,
            authority: JSON.parse(req.body.authority)
        };
        var optionValue = ['position', 'address', 'phone', 'birthday'];

        optionValue.forEach(function (key) {
            var value = req.body[key];
            if (value !== '' && value !== undefined && value !== null) {
                user[key] = value;
            }
        });
        return user;
    }

    User.findOne({ account: account, isLogoff: 0 })
        .exec()
        .then(function (user) {
            if (user === null) {
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
                    message: '添加成功',
                     id: user._id
                });
            }
        })
        .catch(function (err) {
            console.error(err);
            res.json({
                statusCode: -1,
                message: '服务出错'
            });
        });

});

router.get('/', function (req, res) {
    const stepLength = 9;
    const page = (req.query.page && req.query.page > 0) ? req.query.page - 1 : 0;
    if (req.session.l !== 1) {
        res.json({
            statusCode: -9,
            message: '请先登录'
        });
        return;
    }
    if (req.session.user.authority.indexOf(5) === -1) {
        res.json({
            statusCode: -8,
            message: '无权限'
        });
        return;
    }
    var keyRegExp = /[\d\D]*/ig;
    if (req.query.key) {
        keyRegExp = new RegExp(req.query.key, 'ig');
    }
    var queryOpt = {
        $or: [
            {
                account: keyRegExp,
                isLogoff: 0
            },
            {
                name: keyRegExp,
                isLogoff: 0
            },
            {
                position: keyRegExp,
                isLogoff: 0
            },
            {
                address: keyRegExp,
                isLogoff: 0
            }
        ]
    };
    User.find(queryOpt)
        .skip(page * stepLength)
        .limit(stepLength)
        .select('-password')
        .populate({
            path: 'addByUser',
            select: '_id name'
        })
        .populate({
            path: 'modifyByUser',
            select: '_id name'
        })
        .exec()
        .then(function (users) {
            User.count(queryOpt).then(function (count) {
                res.json({
                    statusCode: 0,
                    users: users,
                    pageNum: Math.ceil(count / stepLength)
                });
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

router.post('/delete', function (req, res) {
    if (req.session.l !== 1) {
        res.json({
            statusCode: -9,
            message: '请先登录'
        });
        return;
    }
    if (req.session.user.authority.indexOf(8) === -1) {
        res.json({
            statusCode: -8,
            message: '没有权限'
        });
        return;
    }
    if (!req.body.id) {
        res.json({
            statusCode: 0,
            message: '缺少必要参数',
            resultCode: 2
        });
        return;
    }
    User.findOne({ _id: req.body.id })
        .update({
            $set: {
                isLogoff: 1,
                modifyByUser: req.session.user._id,
                modifyDate: new Date()
            }
        })
        .exec()
        .then(function () {
            res.json({
                statusCode: 0,
                message: '删除成功',
                resultCode: 0
            });
        })
        .catch(function (err) {
            console.error(err);
            res.json({
                statusCode: -1,
                message: '删除失败',
            });
        });
});

router.post('/modify', function (req, res) {
    var account = req.body.account;
    var name = req.body.name;
    var sex = req.body.sex;
    var id = req.body.id;

    if (req.session.user.authority.indexOf(8) === -1) {
        res.json({
            statusCode: -8,
            message: '无权限'
        });
        return;
    }
    if (!account || !id || name === '' || sex === '') {
        res.json({
            statusCode: 1,
            message: '确实必要参数'
        });
        return;
    }


    if (!checkLength(account, 5, 15)
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
            name: name,
            sex: sex,
            modifyByUser: req.session.user._id,
            modifyDate: new Date(),
            authority: JSON.parse(req.body.authority)
        };

        var optionValue = ['position', 'address', 'phone', 'birthday'];

        optionValue.forEach(function (key) {
            var value = req.body[key];
            if (value !== '' && value !== undefined && value !== null) {
                user[key] = value;
            }
        });
        return user;
    }

    User.findOne({ _id: id, isLogoff: 0 })
        .update({
            $set: getNewUser()
        })
        .exec()
        .then(function (user) {
            res.json({
                statusCode: 0,
                message: '修改成功'
            });
        })
        .catch(function (err) {
            console.error(err);
            res.json({
                statusCode: -1,
                message: '服务出错'
            });
        });

});

router.get('/detail/:id', function (req, res) {
    if (req.session.user.authority.indexOf(5) === -1) {
        res.json({
            statusCode: -8,
            message: '无权限'
        });
        return;
    }
    var id = req.params.id;
    User.findOne({ _id: id }, { password: 0 })
        .populate({
            path: 'addByUser',
            select: '_id name'
        })
        .populate({
            path: 'modifyByUser',
            select: '_id name'
        })
        .exec()
        .then(function (user) {
            res.json({
                statusCode: 0,
                user: user || {}
            });
        }).catch(function (err) {
            console.error(err);
        });
});

router.post('/isAccountRepeat', function (req, res) {
    var account = req.body.account;
    if (req.session.l !== 1) {
        res.json({
            statusCode: -9,
            message: '请先登录'
        });
        return;
    }
    if (req.session.user.authority.indexOf(6) === -1) {
        res.json({
            statusCode: -8,
            message: '权限不够'
        });
        return;
    }
    if (account === '') {
        res.json({
            statusCode: 1,
            message: '缺少必要参数'
        });
        return;
    }
    User.findOne({ account: account, isLogoff: 0 })
        .exec()
        .then(function (user) {
            if (user !== null) {
                res.json({
                    statusCode: 0,
                    message: '账号已被占用',
                    resultCode: 0,
                    id: user.id
                });
            } else {
                res.json({
                    statusCode: 0,
                    message: '账号可用',
                    resultCode: 1,
                    id: null
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