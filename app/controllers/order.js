'use strict';
var router = require('express').Router();
var async = require('async');
var mongoose = require('mongoose');

var Order = mongoose.model('Order');
var OrderProduct = mongoose.model('OrderProduct');


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

router.get('/', function (req, res) {
    if (req.session.user.authority.indexOf(10) === -1) {
        res.json({
            statusCode: -8,
            message: '无权限'
        });
        return;
    }

    const stepLength = 9;
    const page = (req.query.page && req.query.page > 0) ? req.query.page - 1 : 0;
    let key = req.query.key || '';
    let findOpt = {
        name: new RegExp(key, 'ig'),
        isLogoff: {
            $lt: 1
        }
    };

    Order.find(findOpt)
        .skip(page * stepLength)
        .limit(stepLength)
        //.populate('orderProducts')
        .exec()
        .then(function (orders) {
            console.log('find orders');
            Order.count(findOpt).then(function (count) {
                res.json({
                    statusCode: 0,
                    orders: orders,
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

router.post('/:id/product/add', function (req, res) {
    if (req.session.user.authority.indexOf(12) === -1) {
        res.json({
            statusCode: -8,
            message: '没有权限'
        });
        return;
    }
    let name = req.body.name;
    let num = req.body.num;
    let productId = req.body.productId;
    if (!name || !num || !productId || !/^\d+$/g.test(num) || parseInt(num) < 1) {
        res.json({
            statusCode: 0,
            resultCode: 2,
            message: '参数不合法'
        });
        return;
    }

    let newOrderProduct = {
        name: name,
        num: num,
        productId: productId
    };

    let hasSaveOrderProduct;
    new OrderProduct(newOrderProduct).save()
        .then(function (orderProduct) {
            hasSaveOrderProduct = orderProduct;
            return orderProduct._id
        }).catch(function (err) {
            res.json({
                statusCode: -1,
                message: '添加失败'
            });
            console.error(err);
        }).then(function (id) {
            return Order.findOne({ _id: req.params.id })
                .update({
                    modifyUser: req.session.user._id,
                    modifyDate: new Date(),
                    $push: { orderProducts: id }
                })
                .exec();
        }).then(function (order) {
            res.json({
                statusCode: 0,
                resultCode: 0,
                message: '添加成功',
                orderProduct: hasSaveOrderProduct
            });
        }).catch(function (err) {
            res.json({
                statusCode: -1,
                message: '添加失败'
            });
            console.error(err);
        })

});

router.post('/:id/product/delete', function (req, res) {
    if (req.session.user.authority.indexOf(12) === -1) {
        res.json({
            statusCode: -8,
            message: '没有权限'
        });
        return;
    }
    let orderProductId = req.body.orderProductId;
    if (!orderProductId) {
        res.json({
            statusCode: 0,
            resultCode: 1,
            message: '参数不符合要求'
        });
        return;
    }

    Order.findOne({ _id: req.params.id })
        .update({
            $pull: { orderProduct: orderProductId }
        })
        .exec()
        .then(function (order) {
            res.json({
                statusCode: 0,
                resultCode: 0,
                message: '删除成功'
            });
            OrderProduct.findOne({ _id: orderProductId })
                .remove()
                .exec()
                .catch(function (err) {
                    console.error(err);
                    console.error('delete orderproduct fail _id=' + orderProductId);
                });
        }).catch(function (err) {
            console.error(err);
            res.json({
                statusCode: -1,
                message: '删除失败'
            })
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
