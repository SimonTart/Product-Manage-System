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
        return;
    }
    new Order({
        name: name,
        description: description,
        addUser: req.session.user._id,
        modifyUser: req.session.user._id
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

router.get('/detail/:id', function (req, res) {
    if (req.session.user.authority.indexOf(12) === -1) {
        res.json({
            statusCode: -8,
            message: '没有权限'
        });
        return;
    }
    let id = req.params.id;
    Order.findOne({ _id: id })
        .populate('orderProducts')
        .exec()
        .then(function (order) {
            res.json({
                statusCode: 0,
                resultCode: 0,
                order: order
            });
        })
        .catch(function (err) {
            console.error(err);
            res.json({
                statusCode: -1,
                message: '失败'
            });
        })
});
