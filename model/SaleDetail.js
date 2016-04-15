var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var SaleDetail = new Schema({
	id: {type:Schema.Types.ObjectId,require:true},
	productId: {type:Schema.Types.ObjectId,require:true},
	saleRecordId: {type:Schema.Types.ObjectId,require:true},
	num:{type:Number,required:true},
	salePrice:{type:Number,require: true},
	originPrice:{type:Number,require: true}
});
mongoose.model("SaleDetail",SaleDetail);