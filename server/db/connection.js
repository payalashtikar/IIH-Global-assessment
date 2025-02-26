const mongoose = require('mongoose')

function connectDB() {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }

    mongoose.connect(process.env.MONGO, connectionParams)
        .then(() => console.log('CONNECTION ESTABLISHED'))
        .catch((error) => console.log('CONNECTION FAILED', error))
}

module.exports = connectDB