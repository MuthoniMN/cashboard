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
savingsRouter.get("/", async(req, res) => {
    let userId = req.query.user;
    
    try {
        let user = await User.findById(userId)

        res.status(200);
        res.json({savings: user.savings})
    } catch (err) {
        console.error(err);
        res.status(500);
        res.json({
            status: 'error',
            message: "Savings not found."
        })
    }
})

// get a saving goal
savingsRouter.get('/:id', async(req, res) => {
    let userId = req.query.user
    let id = req.params.id

    try {
        let user = await User.findById(userId)

        let saving = user.savings.filter(saving => saving._id == id)  

        res.status(200)
        res.json({
            saving: saving
        })
    } catch (err) {
        console.error(err)
        res.status(500)
        res.json({
            status: "error",
            message: "Saving not found!"
        })
    }
})

// update a saving goal
savingsRouter.put('/:id', async(req, res) => {
    let userId = req.query.user;
    let id = req.params.id;
    let amount = req.body.amount

    try {
        await User.updateOne({
            _id: userId, 
            "savings._id": id
        }, {
            $inc: {
                "savings.$.currentAmount": amount
            }
        })

        let user = await User.findById(userId);

        res.status(200);
        res.json({
            savings: user.savings
        })
    } catch (err) {
        
    }
})

// delete a saving goal
savingsRouter.delete('/:id', (req, res) => {})

module.exports = savingsRouter