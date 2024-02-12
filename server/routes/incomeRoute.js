const express = require('express')
const incomeRouter = express.Router();
const User = require('../models/User')

// create income
incomeRouter.post('/add', async (req, res) => {
    const id = req.query.user
    const newIncome = req.body

    try {
        const user = await User.findById(id)
        const income = user.income

        income.push(newIncome)

        await User.findByIdAndUpdate(id, {
            $set: {
                income: income
            }
        })

        const updated = await User.findById(id)
        res.status(201)
        res.json({
            income: updated.income
        })
    } catch (err) {
        console.error(err)
        res.status(500)
        res.json({
            status: "error",
            message: "Income not added"
        })
    }

})

// get all income sources
incomeRouter.get("/", (req, res) => {})

// get a income
incomeRouter.get('/:id', (req, res) => {})

// update a income
incomeRouter.put('/:id', (req, res) => {})

// delete a income
incomeRouter.delete('/:id', (req, res) => {})

module.exports = incomeRouter