const mongoose = require('mongoose')
const mongoURL = process.env.MONGO_URL

const connectToDb = async () => {
    try {
        const dbConn = await mongoose.connect(mongoURL)
        console.log("Database Connected!")
    } catch (err) {
        console.error("Error: Database not connected")
        process.exit(1)
    }
}

module.exports = connectToDb