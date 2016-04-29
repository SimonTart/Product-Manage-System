'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Product = mongoose.model('Product');

module.exports = function (app) {
    app.use('/api/product', router);
};

//添加
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
    let discount = req.body.discount;
    if (!name ||
        !/^\d+(.\d){0,1}$/g.test(price) ||
        !/^\d+$/g.test(num) ||
        !(discount && /^\d+(.\d){0,1}$/g.test(discount))
    ) {
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
    if(discount){
        newProduct.discount = discount;
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

//查询
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
    if (req.session.user.authority.indexOf(1) === -1) {
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

//查询详情
router.get('/:id', function (req, res) {
    if (req.session.user.authority.indexOf(1) === -1) {
        res.json({
            statusCode: -8,
            message: '没有权限'
        });
        return;
    }
    let id = req.params.id;
    Product.findOne({ _id: id })
        .exec()
        .then(function (product) {
            res.json({
                statusCode: 0,
                resultCode: 0,
                product: product
            });
        })
        .catch(function (err) {
            res.json({
                statusCode: -1
            });
            console.error(err);
        });

});

//删除
router.post('/delete', function (req, res) {
    if (req.session.user.authority.indexOf(4) === -1) {
        res.json({
            statusCode: -8,
            message: '没有权限'
        });
        return;
    }
    let id = req.body.id;
    if (!id) {
        res.json({
            statusCode: 0,
            resultCode: 2,
            message: '缺少必要参数'
        });
        return;
    }
    Product.findOne({ _id: id })
        .update({
            $set: {
                isLogoff: 1
            }
        })
        .exec()
        .then(function () {
            res.json({
                statusCode: 0,
                resultCode: 0,
                message: '删除成功'
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

//修改
router.post('/modify', function (req, res) {
    if (req.session.user.authority.indexOf(3) == -1) {
        res.json({
            statusCode: -8,
            message: '没有权限'
        });
        return;
    }

    let id = req.body.id;
    let totalNumber = req.body.totalNumber;
    let storeNumber = req.body.storeNumber;
    let price = req.body.price;
    let name = req.body.name;
    if (!id ||
        !name ||
        !/^\d+$/g.test(totalNumber) ||
        !/^\d+$/g.test(storeNumber) ||
        parseInt(totalNumber) < parseInt(storeNumber) ||
        !/^\d+(.\d){0,1}$/g.test(price)
    ) {
        res.json({
            statusCode: 0,
            resultCode: -1,
            message: '参数不合法'
        })
        return;
    }

    let newProduct = {
        totalNumber: totalNumber,
        storeNumber: storeNumber,
        name: name,
        price: price,
        modifyDate: new Date(),
        modifyUser: req.session.user._id
    }
    Product.findOne({ _id: id })
        .update({ $set: newProduct })
        .exec()
        .then(function (product) {
            res.json({
                statusCode: 0,
                resultCode: 0
            });
        })
        .catch(function (err) {
            console.log(err);
            res.json({
                statusCode: -1,
                messageL: '服务暂时无用'
            });
        });

});