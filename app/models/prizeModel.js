// B1: Import mongooseJS
const mongoose = require("mongoose");

// B2: Define Schema
const Schema = mongoose.Schema;

// B3: Create schema
const prizeSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
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

// B4: Export model
module.exports = mongoose.model("prizes", prizeSchema);