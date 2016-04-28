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
	modifyDate:{type:Date,default: Date.now},
	modifyByUser:{
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	isLogoff:{
		type:Number,
		default: 0,
		require: true
	}
});
/**
 * AUTHORITY DETAIL
 * 1-> 查看商品信息 2-> 添加商品 3-> 编辑商品 4-> 删除商品 5->出售商品
 * 6-> 查看用户信息 7-> 添加用户 8-> 编辑用户信息 9-> 删除用户
 * 10-> 查看订单信息 11-> 新建订单 12-> 编辑订单 13->删除订单
 * 14-> 查看报表
 * **/

 /**
  * sex 1-> woman 0->man
  */

mongoose.model('User', UserSchema);