const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("../models/userModel")

const register = async (req, res) => {
    try {
        const { email, password, } = req.body
        if (!email || !password) {
            return res.status(404).json({ message: "please fill all required data" })
        }

        const user = await User.findOne({ email: email })
        if (user) {
            return res.status(404).json({ message: "user exist with same email " })
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const newUser = await User.create({ email, password: hashedPassword })
        return res.status(200).json({ message: "Registration success", data: newUser })
    }
    catch (error) {
        throw error
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(404).json({ message: "please fill all required data" })
        }

        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(404).json({ message: "user does not exist" })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid Credentials", data: null })
        }

        const token = jwt.sign({ userId: user._id }, process.env.SECRETKEY)
        const updateUserData = await User.findByIdAndUpdate({ _id: user._id }, { $set: { token: token } }, { new: true })
        return res.status(200).json({ message: "Login success", data: updateUserData })
    }
    catch (error) {
        throw error
    }
}

const logout = async (req, res) => {
    try {
        const userId = req.user._id;
        console.log(userId, '>>')
        const user = await User.findById({ _id: userId, delete: false, active: true })
        if (user) {
            await User.findByIdAndUpdate(user, { $set: { token: "" } }, { new: true })
            return res.status(200).json({ message: "logout successfully" })
        }
        else {
            return res.status(200).json({ message: "something went wrong !!" })
        }
    }
    catch (error) {
        throw error
    }
}

module.exports = { register, login, logout }