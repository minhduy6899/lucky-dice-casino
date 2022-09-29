// B1: Import mongooseJS
const mongoose = require("mongoose");

// B2: Define schema
const Schema = mongoose.Schema;

// B3: Create schema
const voucherSchema = new Schema({
  code: {
    type: String,
    unique: true,
    required: true,
  },
  discount: {
    type: Number,
    required: true
  },
  note: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
});

// B4: Export schema
module.exports = mongoose.model("vouchers", voucherSchema);