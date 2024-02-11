const express = require('express')
const accountRouter = express.Router();
const User = require('../models/User')

// create account
accountRouter.post('/add', async (req, res) => {
    let userId = req.query.user

    try {
        let user = await User.findById(userId)
        let account = {
            name: req.body.name,
            desc: req.body.desc,
            currentAmount: req.body.currentAmount
        }
        let accounts = user.accounts
        accounts.push(account)

        await User.findByIdAndUpdate(userId, {
            $set: {
                accounts: accounts
            }
        })
        let updatedUser = await User.findById(userId)

        res.status(200)
        res.json(updatedUser)
    } catch (err) {
        console.error(err)
        res.status(500)
        res.json({
            status: "error",
            message: "Account was not added"
        })
    }
})

// get all accounts
accountRouter.get("/", async (req, res) => {
    let id = req.query.user
    try {
        let user = await User.findById(id)
        res.status(200);
        res.json({
            accounts: user.accounts
        })
    } catch (error) {
        console.error(error)
        res.status(500)
        res.json({
            status: "error",
            message: "Couldn't get the user's accounts"
        })
    }    
})

// get a account
accountRouter.get('/:id', (req, res) => {})

// update a account
accountRouter.put('/:id', (req, res) => {})

// delete a account
accountRouter.delete('/:id', (req, res) => {})

module.exports = accountRouter