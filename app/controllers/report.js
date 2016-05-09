'use strict';
var mongoose = require('mongoose');
var router = require('express').Router();
var SaleRecord = mongoose.model('SaleRecord');
var SaleProduct = mongoose.model('SaleProduct');
var Product = mongoose.model('Product');

module.exports = function (app) {
    app.use('/api/report', router);
};

router.get('/product/sale/rank', function (req, res) {
    let beginDate = req.query.beginDate;
    let endDate = req.query.endDate;
    SaleProduct.aggregate([
        {
            $match: {
                date: { $gt: new Date(beginDate), $lt: new Date(endDate) }
            }
        },
        {
            $group: {
                _id: '$productId',
                saleNumber: { $sum: '$num' },
                name: { $addToSet: '$name' },
            }
        },
        { $sort: { saleNumber: 1 } },
    ]).exec()
        .then((results) => {
            let names = [];
            let saleNumbers = [];
            //console.log(results);
            results.forEach((result) => {
                names.push(result.name[0]);
                saleNumbers.push(result.saleNumber);
            });
            res.json({
                names: names,
                saleNumbers: saleNumbers
            });
        }).catch((err) => {
            console.error(err);
            res.json({
                statusCode: -1,
                message: '获取失败'
            });
        })

});

router.get('/addSaleTestData', function () {

});


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}