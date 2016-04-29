var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var SaleRecord = new Schema({
    date: { type: Date, default: Date.now, require: true },
    saleUserId: { type: Schema.Typs.ObjectId, require: true },
    saleProducts: [{ type: Schema.Types.ObjectId, ref: 'SaleProduct' }]
});
mongoose.model("SaleRecord", SaleRecord);