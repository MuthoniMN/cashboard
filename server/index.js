const express = require('express')
const app = express()
const path = require('path')

// routers
const userRouter = require('./routes/userRoute')
const accountRouter = require('./routes/accountRoute')
const incomeRouter = require('./routes/incomeRoute')
const expenseRouter = require('./routes/expenseRoute')
const savingsRouter = require('./routes/savingsRoute')
const investmentRouter = require('./routes/investmentRoute')

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
app.use("/user", userRouter)
app.use("/account", accountRouter)
app.use("/income", incomeRouter)
app.use("/expense", expenseRouter)
app.use("/savings", savingsRouter)
app.use("/investment", investmentRouter)


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