var path = require('path');
var config = require('./config.js');
var express = require('express');
var glob = require('glob');
var swig = require('swig');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();

//set render engin and views
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(config.root + 'app/views'));
swig.setDefaults({ cache: false });
app.set('view cache', false);

//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(session({
    secret: 'product',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 24 * 60 * 60 }
}));

//set static resource
app.use(express.static(path.join(config.root, 'public')));


// auto load models
var models = glob.sync(config.root + 'app/models/**/*.js');
models.forEach(function(model) {
    require(model);
});

// auto load controllers
var controllers = glob.sync(config.root + 'app/controllers/**/*.js');
controllers.forEach(function(controller) {
    require(controller)(app);
});

// auto load routes
var routers = glob.sync(config.root + 'app/routers/**/*.js');
routers.forEach(function(router) {
    require(router)(app);
});

module.exports = app;
