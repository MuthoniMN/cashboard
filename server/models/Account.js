const mongoose = require('mongoose')

const AccountSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        desc: {
            type: String
        },
        currentAmount: {
            type: Number,
            required: true
        },
        currency: String
})

module.exports = AccountSchema;