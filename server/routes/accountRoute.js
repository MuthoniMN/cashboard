const express = require('express');
const accountController = require('../controllers/account');
const accountRouter = express.Router();

// create account
accountRouter.post('/add', accountController.addAccount)

// get all accounts
accountRouter.get("/", accountController.getAllAccounts)

// get a account
accountRouter.get('/:id', accountController.getAccount)

// update a account
accountRouter.put('/:id', accountController.updateAccount)

// delete a account
accountRouter.delete('/:id', accountController.deleteAccount)

module.exports = accountRouter