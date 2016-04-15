var path = require('path');

const mongodb = {
    host: 'localhost',
    port: '27017',
    db: 'lb-test'
};

exports.mongodb = 'mongodb://' + mongodb.host + ':' + mongodb.port + '/' + mongodb.db;
exports.root = path.join(__dirname, '../');
