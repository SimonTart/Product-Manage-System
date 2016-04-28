'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Product = mongoose.model('Product');

module.exports = function (app) {
    app.use('/api/product', router);
};

router.post('/', function (req, res) {
    if (req.session.user.authority.indexOf(2) === -1) {
        res.json({
            statusCode: -8,
            message: '没有权限'
        });
        return;
    }
    let name = req.body.name;
    let num = req.body.number;
    let price = req.body.price;
    if (!name || !/^\d+(.\d){0,1}$/g.test(price) || !/^\d+$/g.test(num)) {
        res.json({
            statusCode: 0,
            resultCode: 2,
            message: '缺少参数或参数不合法'
        });
        return;
    }
    let newProduct = {
        name: name,
        price: price,
        totalNumber: num,
        storeNumber: num,
        addUser: req.session.user._id,
        modifyUser: req.session.user._id
    }

    new Product(newProduct).save()
        .then((product) => {
            res.json({
                statusCode: 0,
                id: product._id,
                resultCode: 0
            })
        })
        .catch((err) => {
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
    let key = req.query.key || '';
    let findOpt = {
        name: new RegExp(key, 'ig'),
        isLogoff: 0
    };
    Product.find(findOpt)
        .skip(page * stepLength)
        .limit(stepLength)
        .exec()
        .then(function (products) {
            Product.count(findOpt).then(function (count) {
                res.json({
                    statusCode: 0,
                    products: products,
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