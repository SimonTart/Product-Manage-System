var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ProductSchema = new Schema({
	name: { type: String, required: true },
	storeNumber: { type: Number, required: true },
	totalNumber: { type: Number, require: true, default: 0 },
	price: { type: Number, required: true, default: 0 },
	addDate: { type: Date, required: true, default: Date.now },
	modifyDate: { type: Date, required: true, default: Date.now },
	addUser: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
	modifyUser: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
	isLogoff: { type: Number, required: true, default: 0 }
});

mongoose.model("Product", ProductSchema);