const User = require('../models/User');
const savingsController = {};

const { dbConn } = require('../config/db');
const { default: mongoose } = require('mongoose');

savingsController.addSavings = async (req, res) => {
    let id = req.query.user;
    let saving = { ...req.body }


    try {
        // add saving
        await User.findByIdAndUpdate(id, {
            $push: {
                savings: saving
            }
        })

        let user = await User.findById(id)

        res.status(200)
        res.json({ savings: user.savings })
    } catch (err) {
        console.error(err)
        res.status(500)
        res.json({
            status: "error",
            message: "Savings not added!"
        })
    }
}

savingsController.getAllSavings = async (req, res) => {
    let userId = req.query.user;

    try {
        let user = await User.findById(userId)

        res.status(200);
        res.json({ savings: user.savings })
    } catch (err) {
        console.error(err);
        res.status(500);
        res.json({
            status: 'error',
            message: "Savings not found."
        })
    }
}

savingsController.getSaving = async (req, res) => {
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

savingsController.updateSaving = async (req, res) => {
    let userId = req.query.user;
    let id = req.params.id;
    let { amount, account, date } = req.body;
    console.log(req.body);

    let session = await mongoose.startSession();
    session.startTransaction();

    try {
        const user = await User.findById(userId).session(session);

        let saving = user.savings.id(id);
        console.log(saving);
        let index = user.savings.findIndex(saving => saving._id == id)

        if(!saving){
            throw new Error("Invalid saving!");
        }

        // update saving
        user.savings[index].currentAmount += Number(amount);
        console.log(user.savings[index].currentAmount);
        await user.save({ session });

        // check if account has enough money
        let acc = user.accounts.id(account);
        let accIndex = user.accounts.indexOf(acc);
        console.log(accIndex)

        if(!acc){
            throw new Error("Invalid account!");
        }

        if(acc.currentAmount < amount){
            throw new Error("Insufficient funds!");
        }

        //update account
        user.accounts[accIndex].currentAmount -= Number(amount);
        await user.save({ session });

        //add transaction
        user.transactions.addToSet({
            type: 'savings',
            typeId: id,
            account: account,
            timestamp: date,
            amount: amount
        })
        await user.save({ session });

        await session.commitTransaction();
        session.endSession();
        console.log("Saving Updated!");

        res.status(200);
        res.json({
            savings: user.savings
        })
    } catch (err) {
        console.error(err);
        await session.abortTransaction();
        session.endSession();
        res.status(500)
        res.json({
            status: "error",
            message: "Saving not updated!"
        })
    }
}

savingsController.deleteSaving = async (req, res) => {
    let userId = req.query.user
    let id = req.params.id

    let session = await mongoose.startSession();
    session.startTransaction();

    try {
        const user = await User.findById(userId).session(session);

        user.savings.id(id).deleteOne();
        user.save({ session });

        user.transactions.pull({ typeId: id });
        user.save({ session });

        session.commitTransaction();
        session.endSession();

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