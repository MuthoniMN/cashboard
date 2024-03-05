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
const savingSchema = require('./Saving');
const expenseSchema = require('./Expense');
const IncomeSchema = require('./Income');
const AccountSchema = require('./Account');
const InvestmentSchema = require('./Investment');
const ReportSchema = require('./Report');
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
    accounts: [AccountSchema],
    income: [IncomeSchema],
    expenses: [expenseSchema],
    savings: [savingSchema],
    investments: [InvestmentSchema],
    reports: [ReportSchema]
}, { timestamps: true })

UserSchema.methods.verifyPassword = async function (password) {
    const user = this;
    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch;
  };

module.exports = mongoose.model('User', UserSchema)