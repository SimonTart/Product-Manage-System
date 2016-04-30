var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var OrderSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    addDate: { type: Date, default: Date.now, required: true },
    modifyDate: { type: Date, default: Date.now, required: true },
    addUser: { type: Schema.Types.ObjectId, required: true },
    modifyUse: { type: Schema.Types.ObjectId, required: true }
});
mongoose.model("Order", OrderSchema);