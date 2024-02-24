const mongoose = require("mongoose");

const IncomeSchema = new mongoose.Schema({
    source: {
        type: String,
        required: true
    },
    payDate: {
        type: Number,
        required: true
    },
    category: {
        type: String,
    },
    amount: {
        type: Number,
        required: true
    }
})

module.exports = IncomeSchema