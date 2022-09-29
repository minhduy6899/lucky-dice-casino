// B1: Import mongooseJS
const mongoose = require("mongoose");

// B2: Define schema
const Schema = mongoose.Schema;

// B3: Create schema
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
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
module.exports = mongoose.model("users", userSchema);