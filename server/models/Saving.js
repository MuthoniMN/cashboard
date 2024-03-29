const mongoose = require("mongoose")

const savingSchema = new mongoose.Schema({
    desc: {
        type: String,
        required: true
    },
    goal: {
        type: String
    },
    lastModified: {
        type: Date,
        required: true
    },
    currentAmount: {
        type: Number,
        required: true
    }
})

module.exports = savingSchema