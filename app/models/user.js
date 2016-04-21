var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	account: { type: String, required: true },
	password: { type: String, required: true },
	name: { type: String, required: true },
	sex: { type: Number, required: true },
	position: { type: String },
	address: { type: String },
	phone: { type: String },
	addByUser: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User'
	},
	authorityNumbers: { type: Array },
	birthday: { type: String }
});

UserSchema.statics = {
	add: function () {

	}
};

mongoose.model('User', UserSchema);