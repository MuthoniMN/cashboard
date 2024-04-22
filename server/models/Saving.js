const mongoose = require("mongoose")

const savingSchema = new mongoose.Schema({
    desc: {
        type: String,
        required: true
    },
    goal: {
        type: String
    },
    currentAmount: {
        type: Number,
        required: true
    },
    currency: String
}, { timestamps: true })

module.exports = savingSchema