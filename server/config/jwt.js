const jwt = require('jsonwebtoken')

const secret_key = "CASH_A$$_BAG$"

const generateToken = (user) => {
    return jwt.sign({id: user._id, username: user.username}, secret_key, {
        expiresIn: '1h'
    })
}

const verifyToken = (token) => {
    return jwt.verify(token, secret_key)
}

module.exports = { generateToken, verifyToken }