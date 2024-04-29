const { listenerCount } = require('../models/Expense');
const User = require('../models/User');
const mongoose = require('mongoose')
const investmentController = {};

investmentController.addInvestment = async (req, res) => {
    let id = req.query.user
    let {desc, amount, account, date, category} = req.body
    
    let session = await mongoose.startSession();
    session.startTransaction();

    try {
        const user = await User.findById(id).session(session);

        user.investments.addToSet({
            desc,
            category,
            currentAmount: amount
        })
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
        user.accounts[accIndex].currentAmount = user.accounts[accIndex].currentAmount - Number(amount);
        await user.save({ session });
        
        await session.commitTransaction();

        session.startTransaction();

        let investmentId = user.investments[user.investments.length - 1]._id

        //add transaction
        user.transactions.addToSet({
            type: 'investments',
            typeId: investmentId,
            account: account,
            timestamp: date,
            amount: amount
        })
        await user.save({ session });

        await session.commitTransaction();
        session.endSession();
        console.log("Investment Updated!");

        res.status(200)
        res.json({
            investments: user.investments
        })
    } catch (err) {
        console.error(err)
        res.status(500);
        res.json({
            status: "error",
            message: err
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
        if(!investment){
            res.status(404)
            res.json({
                status: "error",
                mesage: "Sorry! We couldn't find the investment"
            })
        }
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
    let {amount, account, date}= req.body;

    let session = await mongoose.startSession();
    session.startTransaction();

    try {
        const user = await User.findById(userId).session(session);

        let investment = user.investments.id(id);
        let index = user.investments.findIndex(investment => investment._id == id)

        if(!investment){
            throw new Error("Invalid investment!");
        }

        // update investment
        user.investments[index].currentAmount += Number(amount);
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
            type: 'investments',
            typeId: id,
            account: account,
            timestamp: date,
            amount: amount
        })
        await user.save({ session });

        await session.commitTransaction();
        session.endSession();
        console.log("Investment Updated!");

        let updatedInvestment = user.investments.id(id)

        res.status(200)
        res.json({
            investment: updatedInvestment
        })
    } catch (error) {
        console.error(error)
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

    let session = await mongoose.startSession();
    session.startTransaction();

    try {
        let user = await User.findById(userId).session(session);

        user.investments.id(id).deleteOne();
        await user.save({ session });

        user = await User.findById(userId).session(session);

        user.transactions.pull({ typeId: id });
        await user.save({ session });

        session.commitTransaction();
        session.endSession();
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