const mongoose = require('mongoose');

const InvestmentSchema = new mongoose.Schema({
    desc: {
        type: String,
        required: true
    },
    currentAmount: {
        type: Number,
        required: true,
        default: 0
    },
    currency: String,
    category: {
        type: String
    },
}, { timestamps: true });

module.exports = InvestmentSchema;