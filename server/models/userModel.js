const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: { type: String, default: "" },
    password: { type: String, default: "" },
    token: { type: String, default: "" },
    active: { type: Boolean, default: true },
    delete: { type: Boolean, default: false },
},
    {
        timestamps: true
    }
)

const User = mongoose.model("User", userSchema)
module.exports = User;