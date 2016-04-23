var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ProductSchema = new Schema({
	id:{type:Schema.Types.ObjectId,required:true},
	imageUrl:{type:String},
	name:{type:String,required:true},
	storeNumber:{type:Number,required:true},
	totalNumber:{type:Number,require:true},
	price:{type:Number,required:true},
	addDate:{type:Date,required:true,default:Date.now},
	modifyDate:{type:Date,required:true,default:Date.now},
	addUserId:{type:Schema.Types.ObjectId,required:true},
	modifyUserId:{type:Schema.Types.ObjectId,required:true}
});

mongoose.model("Product",ProductSchema);