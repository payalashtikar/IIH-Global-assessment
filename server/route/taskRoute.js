const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { addTask, getTask, updateStatus, deleteTask, getCount } = require('../controller/taskController');
const router = express.Router()

router.post('/add', authMiddleware, addTask)
    .get('/get', authMiddleware, getTask)
    .patch('/updateStatus/:id', authMiddleware, updateStatus)
    .delete('/delete/:id', authMiddleware, deleteTask)
    .get('/getCount', authMiddleware, getCount)

module.exports = router;