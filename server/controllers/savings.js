const User = require('../models/User');
const savingsController = {};

savingsController.addSavings = async(req, res) => {
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
}

savingsController.getAllSavings = async(req, res) => {
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
}

savingsController.getSaving = async(req, res) => {
    let userId = req.query.user
    let id = req.params.id

    try {
        let user = await User.findById(userId)

        let saving = user.savings.id(id)  

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
}

savingsController.updateSaving = async(req, res) => {
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
        console.error(err);
        res.status(500)
        res.json({
            status: "error",
            message: "Sabing not updated!"
        })
    }
}

savingsController.deleteSaving = async(req, res) => {
    let userId = req.query.user
    let id = req.params.id

    try {
        let user = await User.findById(userId)

        user.savings.id(id).deleteOne()

        res.status(200)
        res.json({
            status: "success",
            message: "Saving successfully deleted!"
        })
    } catch (err) {
        console.error(err)
        res.status(500)
        res.json({
            status: "error",
            message: "Saving not deleted!"
        })
    }
}

module.exports = savingsController;