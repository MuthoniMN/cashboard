const express = require('express')
const savingsRouter = express.Router();
const User = require('../models/User')

// create saving goal
savingsRouter.post('/add', async(req, res) => {
    let id = req.query.user;
    let saving = {...req.body, lastModified: new Date()}

    try {
        await User.findByIdAndUpdate(id, {
            $push: {
                savings: saving
            }
        })

        let user = await User.findById(id)

        res.status(200)
        res.json({savings: user.savings})
    } catch (err) {
        console.error(err)
        res.status(500)
        res.json({
            status: "error",
            message: "Savings not added!"
        })
    }
})

// get all saving goals
savingsRouter.get("/", (req, res) => {})

// get a saving goal
savingsRouter.get('/:id', (req, res) => {})

// update a saving goal
savingsRouter.put('/:id', (req, res) => {})

// delete a saving goal
savingsRouter.delete('/:id', (req, res) => {})

module.exports = savingsRouter