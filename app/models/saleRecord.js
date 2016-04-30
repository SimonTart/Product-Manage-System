var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var SaleRecord = new Schema({
    date: { type: Date, default: Date.now, required: true },
    saleUserId: { type: Schema.Types.ObjectId, required: true },
    saleProducts: [{ type: Schema.Types.ObjectId, ref: 'SaleProduct' }]
});
mongoose.model("SaleRecord", SaleRecord);