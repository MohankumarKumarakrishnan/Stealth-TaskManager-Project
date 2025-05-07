const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../models/userAuth"); 

const JWT_SECRET = process.env.JWT_SECRET; 

module.exports.registerNewUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        console.log(name,email,password)
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: 'User already exists' });
        }

       
        const hashedPassword = await bcrypt.hash(password, 10);

       
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ msg: 'User registered successfully' });
    } catch (error) {
        console.error("error in register user controller",error);
        res.status(500).json({ msg: 'Server error' });
    }
};

module.exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

       
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

       
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Password' });
        }

      
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '24h' });

        res.status(200).json({ msg: 'Login successful', token,name:user.name });
    } catch (error) {
        console.error("Error in login user controller",error);
        res.status(500).json({ msg: 'Server error' });
    }
};
