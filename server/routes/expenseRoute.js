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
expenseRouter.get("/", async(req, res) => {
    let userId = req.query.user

    try {
        let user = await User.findById(userId);

        res.status(200);
        res.json({
            expenses: user.expenses
        })
    } catch (error) {
        console.error(error);
        res.status(500)
        res.json({
            status: "error",
            message: "Expenses not found!"
        })
    }
})

// get a expense
expenseRouter.get('/:id', async(req, res) => {
    let userId = req.query.user
    let id = req.params.id

    try {
        let user = await User.findById(userId)
        let expense = user.expenses.filter(expense => expense._id == id)

        res.status(200)
        res.json({
            expense: expense
        })
    } catch (err) {
        console.error(err);
        res.status(500)
        res.json({
            status: "error",
            message: "Saving not found!"
        })
    }
})

// update a expense
expenseRouter.put('/:id', (req, res) => {})

// delete a expense
expenseRouter.delete('/:id', (req, res) => {})

module.exports = expenseRouter