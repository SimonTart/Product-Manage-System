var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var SaleRecord = new Schema({
	id:{type:Schema.Typs.ObjectId,require:true},
	date:{type: Date,default:Date.now,require:true},
	saleUserId:{type:Schema.Typs.ObjectId,require:true}
});
mongoose.model("SaleRecord",SaleRecord);