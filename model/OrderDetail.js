var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var OrderDetail = new Schema({
	productId: { type: Schema.Types.ObjectId, required: true },
	num: { type: Number, required: true },
});
mongoose.model("OrderDetail",OrderDetail);