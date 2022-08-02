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
customerId: { type: String, required: true },
amount: { type: Number, required: true },

},{timestamps:true});
autoIncrement.initialize(mongoose.connection);
cartSchema.plugin(autoIncrement.plugin, 'cart');
module.exports = mongoose.model("cart", cartSchema);