const express = require('express')
const incomeRouter = express.Router();
const incomeController = require('../controllers/income');

// create income
incomeRouter.post('/add', incomeController.addIncome)

// get all income sources
incomeRouter.get("/", incomeController.getAllIncomes)

// get a income
incomeRouter.get('/:id', incomeController.getIncome)

// delete a income
incomeRouter.delete('/:id', incomeController.deleteIncome)

module.exports = incomeRouter