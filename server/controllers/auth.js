const generateToken =  require("../config/jwt");
const User = require('../models/User');

const authController = {};

authController.login = async function (req, res) {
    const {username, password } = req.body;

    const user = User.findOne({username: username})

    if(user){
        return res.status(404).mesage('User not found!');
    }

    let verified = User.verifyPassword(password)

    if(!verified){
        return res.status(400).message('Passwords don\'t match!')
    }

    let token = generateToken(user)

    res.status(200)
    res.send({
        status: 'successful',
        token: token
    })
}

module.exports = authController