// B1: Import mongooseJS
const mongoose = require("mongoose");

// B2: Define schema
const Schema = mongoose.Schema;

// B3: Create schema
const voucherHistorySchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  },
  vouchers: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'vouchers',
      required: true
    }
  ],
  users: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'users',
      required: false
    }
  ],
});

// B4: Export schema
module.exports = mongoose.model("voucherHistory", voucherHistorySchema);