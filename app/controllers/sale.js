'use strict';
let router = require('express').Router();
let mongoose = require('mongoose');
let SaleProduct = mongoose.model('SaleProduct');
let SaleRecord = mongoose.model('SaleRecord');
let async = require('async');

module.exports = function (app) {
    app.use('/api/sale', router);
};

router.post('/', function (req, res) {
    if (req.session.user.authority.indexOf(5) === -1) {
        res.json({
            statusCode: -8,
            message: '无权限'
        });
        return;
    }
    let products = req.body.products;
    try {
        products = JSON.parse(products);
    } catch (err) {
        res.json({
            statusCode: 0,
            resultCode: 3,
            message: '参数不合法'
        });
        return;
    }
    if (!(Array.isArray(products) && products.length > 0)) {
        res.json({
            statusCode: 0,
            resultCode: 3,
            message: '参数不合法'
        });
        return;
    }
    products = formateProducts(products);
    let hasSaveSaleProductIds = [];
    let saveTasks = products.map((product) => {
        return function (callback) {
            new SaleProduct(product).save()
                .then((saleProduct) => {
                    hasSaveSaleProductIds.push(saleProduct._id);
                    callback(null, saleProduct._id);
                })
                .catch((err) => {
                    callback(err);
                });
        }
    });
    async.parallel(saveTasks, function (err, results) {
        if (err) {
            console.error(err);
            res.json({
                statusCode: 0,
                resultCode: -1,
                message: '保存失败'
            });
            removeSaleProducts(hasSaveSaleProductIds);
            return;
        }

        let newSaleRecord = {
            saleUserId: req.session.user._id,
            saleProducts: results
        }

        new SaleRecord(newSaleRecord).save()
            .then((saleRecord) => {
                res.json({
                    statusCode: 0,
                    resultCode: 0,
                    message: '保存成功',
                    id: saleRecord._id
                });
            })
            .catch((err) => {
                console.error(err);
                res.json({
                    statusCode: 0,
                    resultCode: -1,
                    message: '保存失败'
                });
                removeSaleProducts(hasSaveSaleProductIds);
            });
    });


});

function formateProducts(products) {
    let needProperty = ['name', 'price', 'num'];
    return products.map(function (product) {
        var formateProduct = {};
        for (let i = 0; i < needProperty.length; i++) {
            let property = needProperty[i];
            formateProduct[property] = product[property];
        }
        formateProduct.productId = product._id;
        if (product.discount) {
            formateProduct.discount = product.discount;
        }
        return formateProduct;
    });
}

function removeSaleProducts(productIds) {
    productIds.forEach(function (productId) {
        SaleProduct.findOne({ _id: productId })
            .remove()
            .exec()
            .catch((err) => {
                console.error(err);
            })
    });
}