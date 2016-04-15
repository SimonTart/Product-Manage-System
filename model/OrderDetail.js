var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var OrderDetail = new Scheme({
	id: {type:Schema.Types.ObjectId,require:true},
	productId: {type:Schema.Types.ObjectId,require:true},
	num:{type:Number,required:true},
	orderId:{type:Schema.Types.ObjectId,require:true}
});
mongoose.model("OrderDetail".OrderDetail);