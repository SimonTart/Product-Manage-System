// var router = require('express').Router();

module.exports = function(app) {
    app.use('/login', function(req, res) {
        res.render('login.html');
    });
};
