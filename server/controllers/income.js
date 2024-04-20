const User = require('../models/User')
const incomeController = {}

incomeController.addIncome = async (req, res) => {
    const id = req.query.user
    const newIncome = req.body

    try { 
        // adding new income
        await User.findByIdAndUpdate(id, {
            $push: {
                income: newIncome
            }
        })

        //updating account
        await User.updateOne({
            _id: id,
            "accounts._id": newIncome.account
        }, {
            $inc: {
                "accounts.$.currentAmount": newIncome.amount
            }
        })

        // getting the income id
        let user = await User.findById(id);
        let incomeId = user.income[user.income.length - 1]._id;

        // adding transaction
        await User.findByIdAndUpdate(id, {
            $push: {
                transactions: {
                    type: 'income',
                    typeId: incomeId,
                    account: newIncome.account,
                    timestamp: newIncome.date,
                    amount: newIncome.amount
                }
            }
        });

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

incomeController.deleteIncome = async(req, res) => {
    let userId = req.query.user;
    let id = req.params.id;

    try {
        let user = await User.findById(userId)

        user.income.id(id).deleteOne();

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