const express = require('express')
const userRouter = express.Router();
const bcrpyt = require('bcryptjs')
const User = require('../models/User')

//  create user
userRouter.post('/add', async (req, res) => {
    let salt = await bcrpyt.genSalt()
    let hashedPassword = await bcrpyt.hash(req.body.password, salt)
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
userRouter.get('/:id', (req, res) => {})

//  update user
userRouter.put('/:id', (req, res) => {})

// delete user
userRouter.delete('/id', (req, res) => {})

module.exports = userRouter