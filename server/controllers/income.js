const User = require('../models/User')
const incomeController = {}

incomeController.addIncome = async (req, res) => {
    const id = req.query.user
    const newIncome = req.body

    try { 
        await User.findByIdAndUpdate(id, {
            $push: {
                income: newIncome
            }
        })

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