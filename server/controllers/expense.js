const User = require('../models/User');
const mongoose = require('mongoose')
const expenseController = {};

expenseController.addExpense = async(req, res) => {
    let id = req.query.user
    let expense = {...req.body};

    let session = await mongoose.startSession();
    session.startTransaction();


    try {
        const user = await User.findById(id).session(session);

        // add the new expense
        user.expenses.addToSet(expense);
        await user.save({ session })

        console.log(expense)
        //update the account that paid for the expense
        // check if account has enough money
        let acc = user.accounts.id(expense.account);
        let accIndex = user.accounts.indexOf(acc);
        console.log(accIndex)

        if(!acc){
            throw new Error("Invalid account!");
        }

        if(acc.currentAmount < expense.amount){
            throw new Error("Insufficient funds!");
        }

        //update account
        user.accounts[accIndex].currentAmount -= Number(expense.amount);
        await user.save({ session });

        await session.commitTransaction();

        session.startTransaction();

        let expenseId = user.expenses[user.expenses.length - 1]._id

        //add transaction
        user.transactions.addToSet({
            type: 'expenses',
            typeId: expenseId,
            account: expense.account,
            timestamp: expense.date,
            amount: expense.amount
        })
        await user.save({ session });

        await session.commitTransaction();
        session.endSession();
        console.log("Expense Added!");

        let updatedUser = await User.findById(id);

        res.status(200)
        res.json({expenses: updatedUser.expenses})
    } catch (err) {
        console.error(err);
        res.status(500)
        res.json({
            status: "error",
            message: "Expense not added"
        })
    }
}

expenseController.getAllExpenses = async(req, res) => {
    let userId = req.query.user

    try {
        let user = await User.findById(userId);

        res.status(200);
        res.json({
            expenses: user.expenses
        })
    } catch (error) {
        console.error(error);
        res.status(500)
        res.json({
            status: "error",
            message: "Expenses not found!"
        })
    }
}

expenseController.getExpense = async(req, res) => {
    let userId = req.query.user
    let id = req.params.id

    try {
        let user = await User.findById(userId)
        let expense = user.expenses.id(id)

        res.status(200)
        res.json({
            expense: expense
        })
    } catch (err) {
        console.error(err);
        res.status(500)
        res.json({
            status: "error",
            message: "Saving not found!"
        })
    }
}

expenseController.deleteExpense = async(req, res) => {
    let userId = req.query.user;
    let id = req.params.id;

    let session = await mongoose.startSession();
    session.startTransaction();

    try {
        let user = await User.findById(userId).session(session);

        user.expenses.id(id).deleteOne();
        await user.save({ session });

        user = await User.findById(userId).session(session);

        user.transactions.pull({ typeId: id });
        await user.save({ session });

        session.commitTransaction();
        session.endSession();

        res.status(200)
        res.json({
            status: "sucess",
            message: "Expense successfully deleted!"
        })
    } catch (error) {
        console.error(error);
        res.status(500)
        res.json({
            status: "sucess",
            message: "Expense not deleted!"
        })
    }
}

module.exports = expenseController;