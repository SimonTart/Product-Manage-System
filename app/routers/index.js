// var router = require('express').Router();

module.exports = function(app) {
    app.get('/', function(req, res) {
        if(req.session.l !== 1){
            res.redirect('/login');
            return;
        }
       res.render('index');
    });
};
