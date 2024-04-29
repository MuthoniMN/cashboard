const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')

// routers
const userRouter = require('./routes/userRoute')
const accountRouter = require('./routes/accountRoute')
const incomeRouter = require('./routes/incomeRoute')
const expenseRouter = require('./routes/expenseRoute')
const savingsRouter = require('./routes/savingsRoute')
const investmentRouter = require('./routes/investmentRoute')
const authRouter = require('./routes/auth')

// loading static files such as css and images
app.use(express.static(path.join(__dirname, 'public')))
// parsing the request body
app.use(express.json())
// allow for requests from the frontend
const corsOptions = {
    origin: ['http://localhost:5137', 'https://cashboard-ucpq.onrender.com']
  };
app.use(cors(corsOptions));

const dotenv = require('dotenv')
const connectToDb= require('./config/db')
dotenv.config({path: ".env"})

connectToDb();

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
app.use("/auth", authRouter)


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