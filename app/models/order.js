var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var OrderSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    addDate: { type: Date, default: Date.now, required: true },
    modifyDate: { type: Date, default: Date.now, required: true },
    addUser: { type: Schema.Types.ObjectId, required: true },
    modifyUser: { type: Schema.Types.ObjectId, required: true },
    orderProducts: [{ type: Schema.Types.ObjectId, ref: 'OrderProduct' }],
    isLogoff:{type: Number, required: true,default: 0}
});
mongoose.model("Order", OrderSchema);