const express = require('express')
const investmentRouter = express.Router();
const User = require('../models/User')

// create investment
investmentRouter.post('/add', async (req, res) => {
    let id = req.query.user
    let newInvestment = {...req.body, lastModified: new Date()}
    
    try {
        await User.findByIdAndUpdate(id, {
            $push: {
                investments: newInvestment
            }
        })
        let user = await User.findById(id)
        res.status(200)
        res.json({
            investments: user.investments
        })
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
        res.json({investments:user.investments})
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
investmentRouter.get('/:id',  async(req, res) => {
    let userId = req.query.user
    let id = req.params.id

    try {
        let user = await User.findById(userId)
        let investment = user.investments.filter(a => a._id == id)
        res.status(200)
        res.json(investment)
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
investmentRouter.put('/:id', async(req, res) => {
    let userId = req.query.user;
    let id = req.params.id;
    let amount = req.body.amount;

    try {
        await User.updateOne({
            _id: userId, 
            "investments._id": id
        }, {
            $inc: {
                "investments.$.currentAmount": amount
            }
        })

        let user = await User.findById(userId);

        res.status(200)
        res.json({
            investments: user.investments
        })
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