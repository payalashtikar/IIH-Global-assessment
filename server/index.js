const express = require('express')
const app = express()
const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config()
const port = process.env.PORT
const connectDB = require('./db/connection')
connectDB()

app.use(cors())
app.use(express.json())
app.use(require('./route/userRoute'))
app.use(require('./route/taskRoute'))


app.listen(port, (error) => {
    if (error) throw error
    console.log(`server running on port ${port}`)
})