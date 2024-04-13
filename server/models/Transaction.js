const mongoose = require('mongoose')

const TransactionSchema = new mongoose.Schema({
        type: {
            type: String,
            required: true
        },
        typeId: {
            type: mongoose.Types.ObjectId
        },
        amount: {
            type: Number,
            required: true
        },
        timestamp: Date
})

module.exports = TransactionSchema;