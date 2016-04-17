// var router = require('express').Router();

module.exports = function(app) {
    app.get('/', function(req, res) {
       res.render('index');
    });
};
