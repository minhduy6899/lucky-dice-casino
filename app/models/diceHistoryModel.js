// B1: Import mongooseJS
const mongoose = require("mongoose");

// B2: Defind Schema 
const Schema = mongoose.Schema;

// B3: Create schema 
const diceHistorySchema = new Schema({
    dice: {
        type: Number,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    users: [
        {
            type: mongoose.Types.ObjectId,
            require: true,
            ref: "users"
        }
    ]
});

// B4: Export model
module.exports = mongoose.model("diceHistory", diceHistorySchema);