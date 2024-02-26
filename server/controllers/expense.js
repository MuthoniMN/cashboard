const User = require('../models/User');
const expenseController = {};

expenseController.addExpense = async(req, res) => {
    let id = req.query.user
    let expense = {...req.body, date: new Date()};

    try {
        await User.findByIdAndUpdate(id, {
            $push: {
                expenses: expense
            }
        });
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

    try {
        let user = await User.findById(userId);

        user.expenses.id(id).deleteOne()

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