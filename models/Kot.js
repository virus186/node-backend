const mongoose = require("mongoose");

let autoIncrement = require('mongoose-auto-increment');

const kotSchema = new mongoose.Schema({
userId: { type: String, required: true},
products: [
    {
        productId: { type: String },
        quantity: { type: Number, default: 1 },
    },
],
customerId: {type:String},
userId: {type:Number, required: true},
hotelId: {type:Number, required: true},
tableNo: { type: Number },
status: { type: String, default: 'pending' },

},{timestamps:true});
autoIncrement.initialize(mongoose.connection);
kotSchema.plugin(autoIncrement.plugin, 'kot');
module.exports = mongoose.model("kot", kotSchema);