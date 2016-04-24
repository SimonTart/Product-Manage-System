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
	authority: { type: Array },
	birthday: { type: String },
	addDate:{type:Date,default: Date.now},
	modifyDate:{type:Date},
	modifyByUser:{
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
});
/**
 * AUTHORITY DETAIL
 * 1-> 查看商品信息 2-> 添加商品 3-> 编辑商品 4-> 删除商品
 * 5-> 查看用户信息 6-> 添加用户 7-> 编辑用户信息 8-> 删除用户
 * 9-> 查看订单信息 10-> 新建订单 11-> 编辑订单 12->删除订单
 * 13-> 查看报表
 * **/

UserSchema.statics = {
	add: function () {

	}
};

mongoose.model('User', UserSchema);