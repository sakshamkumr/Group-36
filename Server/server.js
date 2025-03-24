require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const URI = "mongodb+srv://rajputnipun1:rajputnipun1@cluster0.6tenq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String
});

const User = mongoose.model('User', userSchema);

mongoose.connect(URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

app.post("/register", async (req, res) => {
    try {
        // console.log(req.body);
        const { name, email, password } = req.body;
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
});

app.get('/check-email', async (req, res) => {
    try {
        const { email } = req.query;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const user = await User.findOne({ email });

        if (user) {
            // console.log(user)
            return res.status(200).json({ exists: true, message: 'Email is already registered' });
        } else {
            return res.status(200).json({ exists: false, message: 'Email is available' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
});

app.post('/verify', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

            // console.log(user)
            if (user?.password === password) {
                return res.status(200).json({ verified: true, info: user, message: 'User verified' });
            } else {
                return res.status(200).json({ verified: false, message: 'Invalid credentials' });
            }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
});

app.listen(3000, () => {
    console.log(`Server running on port 3000`);
  });