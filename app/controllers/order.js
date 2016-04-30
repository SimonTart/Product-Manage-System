'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Order = mongoose.model('Order');

module.exports = function (app) {
    app.use('/api/order', router);
};

router.post('/', function (req, res) {
    if (req.session.user.authority.indexOf(11) === -1) {
        res.json({
            statusCode: -8,
            message: '没有权限'
        });
        return;
    }
    let name = req.body.name;
    let description = req.body.description;
    if (name === '') {
        res.json({
            statusCode: 0,
            resultCode: 2,
            message: '缺少必要参数'
        });
    }
    new Order({
        name: name,
        description: description
    }).save()
        .then((order) => {
            res.json({
                statusCode: 0,
                resultCode: 0,
                id: order._id,
                message: '添加成功'
            });
        }).catch((err) => {
            console.error(err);
        })
});
