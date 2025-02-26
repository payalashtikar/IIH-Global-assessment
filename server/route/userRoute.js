const express = require('express');
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware');
const { register, login, logout } = require('../controller/userController');

router.post('/register', register).post('/login', login).put('/logout', authMiddleware, logout)

module.exports = router;