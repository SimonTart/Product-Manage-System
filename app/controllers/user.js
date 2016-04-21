var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var utils = require('../middlewares/utils.js');

module.exports = function (app) {
    app.use('/api/user', router);
};

router.post('/', function (req, res) {
    console.log(req.query);
    res.json(req.body);
});