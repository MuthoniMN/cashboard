const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    dateIssued: {
        type: Date,
        required: true
    }
});

module.exports = ReportSchema;