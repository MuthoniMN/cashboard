const express = require('express')
const incomeRouter = express.Router();
const User = require('../models/User')

// create income
incomeRouter.post('/add', async (req, res) => {
    const id = req.query.user
    const newIncome = req.body

    try {
        const user = await User.findById(id)

        await User.findByIdAndUpdate(id, {
            $push: {
                income: newIncome
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
incomeRouter.get("/", async (req, res) => {
    let id = req.query.user;
    try {
        let user = await User.findById(id)

        res.status(200)
        res.json({
            income: user.income
        })
    } catch (err) {
        console.error(err)
        res.status(500)
        res.json({
            status: "error",
            message: "Income not available"
        })
    }

})

// get a income
incomeRouter.get('/:id', async (req, res) => {
    let userId = req.query.user
    let id = req.params.id

    try {
        let user = await User.findById(userId);
        console.log(user)
        let income = user.income;
        let result

        income.forEach(i => {
            if(i._id == id){
                result = i
            }
        })

        res.status(200)
        res.json({
            income: result
        })
    } catch (err) {
        console.error(err)
        res.status(500)
        res.json({
            status: "error",
            message: "Income not available"
        })
    }
})

// update a income
incomeRouter.put('/:id', (req, res) => {})

// delete a income
incomeRouter.delete('/:id', (req, res) => {})

module.exports = incomeRouter