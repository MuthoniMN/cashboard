const User = require('../models/User');
const accountController = {};

accountController.addAccount = async (req, res) => {
    let userId = req.query.user

    try {
        let account = {
            name: req.body.name,
            desc: req.body.desc,
            currentAmount: req.body.currentAmount,
            currency: req.body.currency
        }

        await User.findByIdAndUpdate(userId, {
            $push: {
                accounts: account
            }
        })
        let updatedUser = await User.findById(userId)

        res.status(200)
        res.json({accounts: updatedUser.accounts})
    } catch (err) {
        console.error(err)
        res.status(500)
        res.json({
            status: "error",
            message: "Account was not added"
        })
    }
}

accountController.getAllAccounts = async (req, res) => {
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
}

accountController.getAccount = async (req, res) => {
    let userId = req.query.user
    let id = req.params.id

    try {
        let user = await User.findById(userId)

        let account = user.accounts.id(id)
        if(account){
            res.status(200)
            res.json({
                account: account
            })
        }else{
            res.status(404)
            res.json({
                status: "error",
                mesage: "Sorry! We couldn't find the account"
            })
        }
    } catch (err) {
        console.error(err)
        res.status(500)
        res.json({
            status: "error",
            mesage: "Account not available"
        })
    }
    
}

accountController.updateAccount = async(req, res) => {
    let userId = req.query.user;
    let id = req.params.id;
    let amount = req.body.amount;

    try {
        
        await User.updateOne({
            _id: userId,
            "accounts._id": id
        }, {
            $set: {
                "accounts.$.currentAmount": amount
            }
        })

        let user = await User.findById(userId)
        let account = user.accounts.id(id)
        res.status(200)
        res.json({
            account: account
        })

    } catch (error) {
        console.error(error)
        res.status(500)
        res.json({
            status: "error",
            message: "Account not updated"
        })
    }
}

accountController.deleteAccount = async (req, res) => {
    let userId = req.query.user
    let id = req.params.id

    try {
        await User.findOneAndUpdate(
            { _id: userId },
            { $pull: { accounts: { _id: id} } },
            { new: true }
        )

        res.status(200)
        res.json({
            status: "success",
            message: "Account successfully deleted"
        })

    } catch (err) {
        console.error(err)
        res.status(500)
        res.json({
            status: "error",
            message: "Account not deleted"
        })
    }
}

module.exports = accountController;