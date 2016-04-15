var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	id:{type:Schema.Types.ObjectId,required:true},
	account:{type:String,required:true},
	password:{type:String,required:true},
	name:{type:String,required:true},
	sex:{type:Number,required:true},
	position:{type:String,required:true},
	address:{type:String},
	phoneNumber:{type:String},
	addByUserId:{type:Schema.Types.ObjectId,required:true},
	authorityNumbers:{type:Array},
	birthday:{type:String}
});

mongoose.model("User",UserSchema);