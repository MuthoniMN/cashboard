const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    desc: {
        type: String,
        required: true
    },
    category: {
        type: String
    },
    date: {
        type: Date,
        required: true
    },
    account: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency: String
})

module.exports = expenseSchema