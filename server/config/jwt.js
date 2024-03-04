const jwt = require('jsonwebtoken')

const secret_key = process.env.SECRET_KEY

const generateToken = (user) => {
    return jwt.sign({id: user._id, email: user.email}, secret_key, {
        expiresIn: '1h'
    })
}

const verifyToken = (token) => {
    return jwt.verify(token, secret_key)
}

module.exports = { generateToken, verifyToken }