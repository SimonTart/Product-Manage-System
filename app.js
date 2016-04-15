var mongoose = require('mongoose');
var log4js = require('log4js');
var app = require('./config/express.js');
var config = require('./config/config.js');
/*conntect mongodb*/
var db = mongoose.connection;
log4js.configure('./config/log4js.json');
mongoose.connect(config.mongodb);
db.on('error', function(err) {
    console.error(err);
});

app.listen(3000);
