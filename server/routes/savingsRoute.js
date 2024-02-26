const express = require('express')
const savingsRouter = express.Router();
const savingsController = require('../controllers/savings');

// create saving goal
savingsRouter.post('/add', savingsController.addSavings)

// get all saving goals
savingsRouter.get("/", savingsController.getAllSavings)

// get a saving goal
savingsRouter.get('/:id', savingsController.getSaving)

// update a saving goal
savingsRouter.put('/:id', savingsController.updateSaving)

// delete a saving goal
savingsRouter.delete('/:id', savingsController.deleteSaving)

module.exports = savingsRouter