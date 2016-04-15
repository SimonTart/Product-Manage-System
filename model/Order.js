var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var OrderSchema = new Schema({
	id: {type:Schema.Types.ObjectId,require:true},
	name: {type:String},
	addDate: {type:Date,default:Date.now},
	modifyDate:{type:Date,default:Date.now},
	addUserId:{type:Schema.Types.ObjectId,require:true},
	modifyUserId:{type:Schema.Types.ObjectId,require:true}
});
mongoose.model("Order",OrderSchema);