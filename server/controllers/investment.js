const User = require('../models/User');
const investmentController = {};

investmentController.addInvestment = async (req, res) => {
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
}

investmentController.getAllInvestments = async (req, res) => {
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
}

investmentController.getInvestment = async(req, res) => {
    let userId = req.query.user
    let id = req.params.id

    try {
        let user = await User.findById(userId)
        let investment = user.investments.id(id)
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
}

investmentController.updateInvestment = async(req, res) => {
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
        let investment = user.investments.id(id)

        res.status(200)
        res.json({
            investment: investment
        })
    } catch (error) {
        console.error(err)
        res.status(500)
        res.json({
            status: "error",
            message: "Investment not updated."
        })
    }
}

investmentController.deleteInvestment = async(req, res) => {
    let userId = req.query.user;
    let id = req.params.id;

    try {
        let user = await User.findById(userId);
        user.investments.id(id).deleteOne();
        res.status(200)
        res.json({
            status: "success",
            message: "Investment successfully deleted!"
        })
    } catch (error) {
        console.error(err)
        res.status(500)
        res.json({
            status: "error",
            message: "Investment not deleted."
        })
    }
}

module.exports = investmentController;