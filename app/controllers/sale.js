'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Product = mongoose.model('Product');

module.exports = function (app) {
    app.use('/api/sale', router);
};

router.post('/', function (req, res) {
 
});