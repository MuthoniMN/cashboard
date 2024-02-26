const express = require('express')
const incomeRouter = express.Router();
const incomeController = require('../controllers/income');

// create income
incomeRouter.post('/add', incomeController.addIncome)

// get all income sources
incomeRouter.get("/", incomeController.getAllIncomes)

// get a income
incomeRouter.get('/:id', incomeController.getIncome)

// update a income
incomeRouter.put('/:id', (req, res) => {})

// delete a income
incomeRouter.delete('/:id', (req, res) => {})

module.exports = incomeRouter