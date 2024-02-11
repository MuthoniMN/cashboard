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

// homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

// routers

//  404 Errors
app.all("*", (req,res) => {
    res.status(404);
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, "views", "404.html"))
    }else if(req.accepts('json')){
        res.json({
            status: "error",
            mesage: "This resource could not be found"
        })
    }else if(req.accepts('txt')){
        res.send("The resource could not be found")
    }
})

app.listen(PORT, () => console.log(`We're running on port ${PORT}`))