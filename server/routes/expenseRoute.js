const express = require('express')
const expenseRouter = express.Router();
const User = require('../models/User');
const expenseController = require('../controllers/expense');

// create expense
expenseRouter.post('/add', expenseController.addExpense)

// get all expenses
expenseRouter.get("/", expenseController.getAllExpenses)

// get a expense
expenseRouter.get('/:id', expenseController.getExpense)

// delete a expense
expenseRouter.delete('/:id', expenseController.deleteExpense)

module.exports = expenseRouter