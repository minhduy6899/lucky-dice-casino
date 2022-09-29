// B1: Import mongooseJS
const mongoose = require("mongoose");

// B2: Define schema
const Schema = mongoose.Schema;

// B3: Create schema
const prizeHistorySchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  },
  prizes: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'prizes',
      required: true
    }
  ],
  users: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'users',
      required: true
    }
  ],
});

// B4: Export schema
module.exports = mongoose.model("prizeHistory", prizeHistorySchema);