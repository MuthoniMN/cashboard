const bcrypt = require('bcryptjs')
const { generateToken } =  require("../config/jwt");
const User = require('../models/User');

const authController = {};

authController.login = async function (req, res) {
    const {username, password } = req.body;

    const user = await User.findOne({username: username})

    if(!user){
        return res.status(404).send('User not found!');
    }

    let verified = await bcrypt.compare(password, user.password);

    if(!verified){
        return res.status(400).send('Passwords don\'t match!')
    }

    let token = generateToken(user)

    res.status(200)
    res.send({
        status: 'successful',
        token: token
    })
}

module.exports = authController