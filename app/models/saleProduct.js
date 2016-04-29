var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var SaleProduct = new Schema({
    name: { type: String, require: true },
    number: { type: Number, required: true },
    price: { type: Number, require: true },
    discount: { type: Number },
});
mongoose.model("SaleProduct", SaleProduct);