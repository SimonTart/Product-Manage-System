var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var OrderProduct = new Schema({
    name: { type: String, required: true },
    productId: { type: Schema.Types.ObjectId, required: true },
    num: { type: Number, required: true }
});
mongoose.model("OrderProduct", OrderProduct);