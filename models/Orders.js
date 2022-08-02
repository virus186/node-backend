const mongoose = require("mongoose");

let autoIncrement = require('mongoose-auto-increment');

const cartSchema = new mongoose.Schema({
userId: { type: String, required: true},
products: [
    {
        productId: { type: String, required: true },
        quantity: { type: Number, default: 1 },
    },
],
amount: { type: Number, required: true },
tax: { type: Number, required: true },
grand_total: { type: Number, required: true },
customerId: {type:String},
userId: {type:Number, required: true},
hotelId: {type:Number, required: true},
address: { type: Object, required: true },
status: { type: Object, default: 'pending' },

},{timestamps:true});
autoIncrement.initialize(mongoose.connection);
cartSchema.plugin(autoIncrement.plugin, 'cart');
module.exports = mongoose.model("cart", cartSchema);