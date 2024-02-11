/**
 * User credentials -  username, email, password, profile picture
 * Accounts - each account should have a name, description, current balance
 * Income - each income should have a source, paydate, category, amount
 * Expenses - each expense should have a desc, category, date, account, amount
 *  Savings - each saving goal should have a desc, goal amount, current amount, last modified date
 * Investments - each investment should have a desc, curret amount, last modified date
 * Reports -  each report should have a downloadable pdf, date issued, title
 */
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    profilePicture:{
        type: String
    },
    currency: {
        type: String, 
        default: 'KSH'
    },
    accounts: [
        {
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
            }
        }
    ],
    income: [
        {
            source: {
                type: String,
                required: true
            },
            payDate: {
                type: Date,
                required: true
            },
            category: {
                type: String,
            },
            amount: {
                type: Number,
                required: true
            }
        }
    ],
    expenses: [
        {
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
            }
        }
    ],
    savings: [
        {
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
        }
    ],
    investments: [
        {
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
            }
        }
    ],
    reports: [
        {
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
        }
    ]
})

module.exports = mongoose.model('User', UserSchema)