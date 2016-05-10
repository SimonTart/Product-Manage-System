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

router.get('/sale/income/line', function (req, res) {
    let beginDate = req.query.beginDate;
    let endDate = req.query.endDate;
    let type = req.query.type;
    SaleRecord.aggregate([
        { $match: { date: { $gt: new Date(beginDate), $lt: new Date(endDate) } } },
        { $sort: { date: -1 } },
        {
            $group: {
                _id: {
                    year: { $year: "$date" },
                    month: { $month: "$date" },
                    day: { $dayOfMonth: "$date" },
                },
                totalIncome: { $sum: '$totalPrice' }
            }
        },
        {
            $project: {
                date: {
                    $concat: [
                        { $substr: ['$_id.year', 0, 4] }, '/',
                        { $substr: ['$_id.month', 0, 2] }, '/',
                        { $substr: ['$_id.day', 0, 2] }
                    ]
                },
                totalIncome: 1
            }
        }
    ]).exec()
        .then((results) => {
            let dates = [];
            let incomes = [];
            results.forEach(function (res) {
                dates.push(res.date);
                incomes.push(res.totalIncome);
            })
            res.json({
                dates: dates,
                incomes: incomes
            });
        }).catch((err) => {
            console.error(err);
            res.json({
                err: 'err'
            });
        })
});

// router.get('/update/salerecord', function (req, res) {
//     res.json({
//         aaa: 'aaa'
//     });
//     SaleRecord.find().populate('saleProducts').exec()
//         .then(function (saleRecords) {
//             saleRecords.forEach(function (saleRecord) {
//                 let totalPrice = saleRecord.saleProducts.reduce(function (price, pro) {
//                     let discount = pro.discount || 10;
//                     return price + pro.price * pro.num * discount
//                 }, 0);
//                 saleRecord.update({
//                     $set: { totalPrice: totalPrice }
//                 }).exec();
//             });
//         })
// })

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}