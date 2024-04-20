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
    account: {
        type: String,
        required: true
    },
    category: {
        type: String,
    },
    amount: {
        type: Number,
        required: true
    },
    currency: String
})

module.exports = IncomeSchema