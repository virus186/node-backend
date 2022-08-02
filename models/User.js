const mongoose = require("mongoose");

let autoIncrement = require('mongoose-auto-increment');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique:true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  isMerchant: { type: Boolean, default: false },
  isCustomer: { type: Boolean, default: false },
  isVendor: { type: Boolean, default: false },
  accessToken: { type: String }
},{timestamps:true});

autoIncrement.initialize(mongoose.connection);
userSchema.plugin(autoIncrement.plugin, 'users');
module.exports = mongoose.model("users", userSchema);