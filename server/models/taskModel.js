const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title: { type: String, default: "" },
    status: { type: String, default: "Pending", enum: ["Pending", "Complete"] },
    user: { type: mongoose.Types.ObjectId, default: "", ref: "User" },
    active: { type: Boolean, default: true },
    delete: { type: Boolean, default: false },
},
    {
        timestamps: true
    }
)

const Task = mongoose.model("Task", taskSchema)
module.exports = Task;