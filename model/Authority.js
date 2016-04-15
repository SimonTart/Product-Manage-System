var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Authority = new Schema({
	id: {type:Schema.Types.ObjectId,require:true},
	number: {type:Number.Types.ObjectId,require:true},
	name: {type:String,require:true}
});
mongoose.model("Authority",Authority);