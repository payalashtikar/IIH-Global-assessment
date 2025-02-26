const Task = require("../models/taskModel")

const addTask = async (req, res) => {
    try {
        const { title } = req.body
        const userId = req.user._id

        const task = await Task.create({ title: title, user: userId })
        await task.save()
        return res.status(200).json({ message: "task added successfully", data: task })

    }
    catch (error) {
        throw error
    }
}

const getTask = async (req, res) => {
    try {
        const userId = req.user._id
        console.log(userId, '=')
        const tasks = await Task.find({ user: userId, delete: false, active: true })
        if (tasks) {
            return res.status(200).json({ message: "task fetched successfully", data: tasks })
        }
        else {
            return res.status(200).json({ message: "task not found", data: null })
        }
    }
    catch (error) {
        throw error
    }
}

const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const userId = req.user._id;
        const { id } = req.params;



        // Validate status
        if (!["Pending", "Complete"].includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        // Find and update task
        const task = await Task.findOneAndUpdate(
            { _id: id, user: userId },
            { status },
            { new: true }
        );

        if (!task) {
            return res.status(404).json({ message: "Task not found or unauthorized" });
        }

        return res.status(200).json({ message: "Task status updated successfully", task });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}
const deleteTask = async (req, res) => {
    try {
        const userId = req.user.userId
        const id = req.params.id
        const task = await Task.findById({ _id: id, user: userId, delete: false, active: true, })
        if (task) {
            const updateTask = await Task.findOneAndUpdate(task, { $set: { delete: true, active: false } }, { new: true })
            return res.status(200).json({ message: "task deleted successfully", data: updateTask })
        }
        else {
            return res.status(200).json({ message: "task not found", data: null })
        }
    }
    catch (error) {
        throw error
    }
}

const getCount = async (req, res) => {
    try {
        const userId = req.user._id;

        const totalTasks = await Task.countDocuments({ user: userId, active: true, delete: false });
        const completeTasks = await Task.countDocuments({ user: userId, status: "Complete", active: true, delete: false });
        const pendingTasks = await Task.countDocuments({ user: userId, status: "Pending", active: true, delete: false });

        res.status(200).json({
            totalTasks,
            completeTasks,
            pendingTasks
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

module.exports = { addTask, getTask, updateStatus, deleteTask, getCount }