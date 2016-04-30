var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var SaleProduct = new Schema({
    name: { type: String, required: true },
    num: { type: Number, required: true },
    price: { type: Number, required: true },
    discount: { type: Number },
    productId: { type: Schema.Types.ObjectId, required: 'true', ref: 'Product' },
    date: { type: Date, required: true, default: Date.now }
});
mongoose.model("SaleProduct", SaleProduct);