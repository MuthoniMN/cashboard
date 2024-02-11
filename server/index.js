const express = require('express')
const app = express()
const path = require('path')

// loading static files such as css and images
app.use(express.static(path.join(__dirname, 'public')))

const dotenv = require('dotenv')
dotenv.config({path: ".env"})

const dbConnection = require('./config/db')
dbConnection()

const PORT = process.env.PORT

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.listen(PORT, () => console.log(`We're running on port ${PORT}`))