const express = require('express')
const investmentRouter = express.Router();
const User = require('../models/User')

// create investment
investmentRouter.post('/add', async (req, res) => {
    let id = req.query.user
    let newInvestment = {...req.body, lastModified: new Date()}
    
    try {
        let user = await User.findById(id)
    } catch (err) {
        console.error(err)
        res.status(500);
        res.json({
            status: "error",
            message: "Investment could not be added!"
        })
    }
})

// get all investments
investmentRouter.get("/", async (req, res) => {
    let id = req.query.user;
    
    try {
        let user = await User.findById(id)

        res.status(200)
        res.json(user.investments)
    } catch (err) {
        console.error(err)
        res.status(404)
        res.json({
            status: 'error',
            message: "User not found!"
        })
    }
})

// get a investment
investmentRouter.get('/:id', (req, res) => {
    let userId = req.query.user
    let id = req.params.id

    try {
        res.status(200)
    } catch (err) {
        console.error(err)
        res.status(500);
        res.json({
            status: "error",
            message: "Could not find an investment" 
        })
    }
})

// update a investment
investmentRouter.put('/:id', (req, res) => {
    let userId = req.query.user;
    let id = req.params.id;

    try {
        res.status(200)
    } catch (error) {
        console.error(err)
        res.status(500)
        res.json({
            status: "error",
            message: "Investment not updated."
        })
    }
})

// delete a investment
investmentRouter.delete('/:id', (req, res) => {
    let userId = req.query.user;
    let id = req.params.id;

    try {
        res.status(200)
    } catch (error) {
        console.error(err)
        res.status(500)
        res.json({
            status: "error",
            message: "Investment not deleted."
        })
    }
})

module.exports = investmentRouter