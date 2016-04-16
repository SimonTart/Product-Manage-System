var crypto = require('crypto');
var passwordSecret = require('../../config/config.js').passwordSecret;

module.exports = {
    hashPassword: function(password) {
    	return crypto.createHash('sha256')
    		.update(password + passwordSecret)
    		.digest('hex');
    }
};
