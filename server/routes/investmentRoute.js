const express = require('express')
const investmentRouter = express.Router();
const User = require('../models/User');
const investmentController = require('../controllers/investment');

// create investment
investmentRouter.post('/add', investmentController.addInvestment)

// get all investments
investmentRouter.get("/", investmentController.getAllInvestments)

// get a investment
investmentRouter.get('/:id',  investmentController.getInvestment)

// update a investment
investmentRouter.put('/:id', investmentController.updateInvestment)

// delete a investment
investmentRouter.delete('/:id', investmentController.deleteInvestment)

module.exports = investmentRouter