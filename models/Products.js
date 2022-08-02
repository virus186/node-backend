const mongoose = require("mongoose");

let autoIncrement = require('mongoose-auto-increment');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true},
  sku: { type: String, required: true, unique:true },
  desc: { type: String, required: true },
  hsn_code: { type: String, required: true },
  img: { type: String, required: true },
  categories: { type: Array },
  size: {  type: Array  },
  color: {  type: Array  },
  quantity: { type: Number, default: 1 },
  isManageble: { type: Boolean, default: false },
  price: { type: Number,  required: true  }
},{timestamps:true});
autoIncrement.initialize(mongoose.connection);
productSchema.plugin(autoIncrement.plugin, 'products');
module.exports = mongoose.model("products", productSchema);