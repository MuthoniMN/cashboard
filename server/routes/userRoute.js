const express = require('express')
const userRouter = express.Router();
const bcrpyt = require('bcryptjs')
const User = require('../models/User')

//  create user
userRouter.post('/add', async (req, res) => {
    let hashedPassword = await bcrpyt.hash(req.body.password, process.env.SALT)
    let userDetails = {
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    }
    try {
        await User.create(userDetails)
        res.status(201)
        res.json(
            {
                status: 'success',
                message: 'A new user has been created!'
            }
        )
    } catch (error) {
        console.error(error)
        res.status(500)
        res.json(
            {
                status: 'error',
                message: 'User not created! Please try again'
            }
        )
    }
})

// get user
userRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        let user = await User.findById(id)

        res.status(200)
        res.json(user)
    } catch (error) {
        console.error(error)
        res.status(500)
        res.json({
            status: "error",
            message: "We couldn't find the user. Please try again"
        })
    }
})

//  update user
userRouter.put('/:id', async (req, res) => {
    let id = req.params.id
    let updatedUser = {}
    if(req.body.password) {
        try {
            let hashedPassword = await bcrpyt.hash(req.body.password, process.env.SALT)
            updatedUser.password = hashedPassword
        } catch (err) {
            console.error(err)
            res.status(500)
            res.json({
                status: "error",
                message: "The user could not be updated"
            })
        }
    }
    if(req.body.profilePicture) updatedUser.profilePicture = req.body.profilePicture
    if(req.body.currency) updatedUser.currency = req.body.currency

    try {
        await User.findByIdAndUpdate(id, {
            $set: updatedUser
        })
        let user = await User.findById(id)
        res.status(200)
        res.json(user)
    } catch (error) {
        console.error(error)
        res.status(500)
        res.json({
            status: "error",
            message: "The user could not be updated"
        })
    }
})

// delete user
userRouter.delete('/id', (req, res) => {})

module.exports = userRouter