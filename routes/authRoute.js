const express = require('express');
require('dotenv').config();
const User = require('../models/userModel');

const Route = express();
Route.use(express.json());

// signUp

Route.post('/signUp', async (req, res) => {

    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists!' })
        }

        const newUser = new User({ email, password });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        res.status(400).json({ message: 'Server error',error });
    }
})

module.exports = Route