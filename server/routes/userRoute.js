const express = require('express')
const userRouter = express.Router();
const userController = require('../controllers/user');

//  create user
userRouter.post('/add', userController.addUser)

// get user
userRouter.get('/:id', userController.getUser)

//  update user
userRouter.put('/:id', userController.updateUser)

// delete user
userRouter.delete('/:id', userController.deleteUser)

module.exports = userRouter