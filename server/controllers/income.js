const User = require('../models/User')
const mongoose = require('mongoose')
const incomeController = {}

incomeController.addIncome = async (req, res) => {
    const id = req.query.user
    const newIncome = req.body

    let session = await mongoose.startSession();
    session.startTransaction();


    try {
        const user = await User.findById(id).session(session);

        // add the new newIncome
        user.income.addToSet(newIncome);
        await user.save({ session })

        //update the account that paid for the newIncome
        // check if account has enough money
        let acc = user.accounts.id(newIncome.account);
        let accIndex = user.accounts.indexOf(acc);

        if(!acc){
            throw new Error("Invalid account!");
        }

        //update account
        user.accounts[accIndex].currentAmount += Number(newIncome.amount);
        await user.save({ session });

        await session.commitTransaction();

        session.startTransaction();

        let incomeId = user.income[user.income.length - 1]._id

        //add transaction
        user.transactions.addToSet({
            type: 'income',
            typeId: incomeId,
            account: newIncome.account,
            timestamp: newIncome.payDate,
            amount: newIncome.amount
        })
        await user.save({ session });

        await session.commitTransaction();
        session.endSession();
        console.log("Income Added!");

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
}

incomeController.getAllIncomes = async (req, res) => {
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

}

incomeController.getIncome = async (req, res) => {
    let userId = req.query.user
    let id = req.params.id

    try {
        let user = await User.findById(userId);
        let income = user.income.id(id)

        res.status(200)
        res.json({
            income: income
        })
    } catch (err) {
        console.error(err)
        res.status(500)
        res.json({
            status: "error",
            message: "Income not available"
        })
    }
}

incomeController.deleteIncome = async (req, res) => {
    let userId = req.query.user;
    let id = req.params.id;

    try {
        await User.findOneAndUpdate(
            { _id: userId },
            { $pull: { income: { _id: id} } },
            { new: true }
        )
        res.status(200)
        res.json({
            status: "success",
            message: "The income was succefully deleted!"
        })
    } catch (err) {
        console.error(err)
        res.status(500)
        res.json({
            status: "success",
            message: "The income was not deleted!"
        })
    }
}

module.exports = incomeController;