const express = require('express')
const expenseRouter = express.Router();
const User = require('../models/User');

// create expense
expenseRouter.post('/add', async(req, res) => {
    let id = req.query.user
    let expense = {...req.body, date: new Date()};

    try {
        await User.findByIdAndUpdate(id, {
            $push: {
                expenses: expense
            }
        });
        let updatedUser = await User.findById(id);

        res.status(200)
        res.json({expenses: updatedUser.expenses})
    } catch (err) {
        console.error(err);
        res.status(500)
        res.json({
            status: "error",
            message: "Expense not added"
        })
    }
})

// get all expenses
expenseRouter.get("/", (req, res) => {})

// get a expense
expenseRouter.get('/:id', (req, res) => {})

// update a expense
expenseRouter.put('/:id', (req, res) => {})

// delete a expense
expenseRouter.delete('/:id', (req, res) => {})

module.exports = expenseRouter