const mongoose = require('mongoose')

let dbConn;

const connectToDb = async () => {
    const mongoURL = process.env.MONGO_URL
    try {
        dbConn = await mongoose.connect(mongoURL)
        console.log("Database Connected!")
    } catch (err) {
        console.error("Error: Database not connected" + err)
        process.exit(1)
    }
}


module.exports = connectToDb