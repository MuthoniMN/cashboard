const mongoose = require('mongoose');

const InvestmentSchema = new mongoose.Schema({
    desc: {
        type: String,
        required: true
    },
    lastModified: {
        type: Date,
        required: true
    },
    currentAmount: {
        type: Number,
        required: true
    },
    currency: String,
    category: {
        type: String
    },
});

module.exports = InvestmentSchema;