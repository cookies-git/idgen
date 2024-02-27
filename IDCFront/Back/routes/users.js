const express = require('express');
const router = express.Router();
const User = require('../models/userDB');
const bcrypt = require('bcrypt');
// Route handler for creating a new user
// POST route to create a new user
router.post('/', async (req, res) => {
  try {
    // Get user input from request body
    let { name, email, age, phone, password } = req.body;
    email = email.toLowerCase();
    const takenEmail = await User.findOne({ email })
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (takenEmail) {
      return res.json({ message: "Mail address has already been taken" });
    } else if (name.trim() === '' || age.trim()==='' || age.trim()===""|| phone.trim() === '' || password.trim() === ''){
      return res.json({message: "All fields are mandatory"});
    } else if (!regex.test(email)) {
      return res.json({ message: "Wrong mail address format" });
    }
    else {
      // Hash password using bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);
      // Create new user object
      const newUser = new User({
        name,
        email,
        age,
        phone,
        role: 'user',
        password: hashedPassword
      });
      // Save new user to database
      await newUser.save();
      return res.status(201).json({ message: "Account Created! Login for using the service!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

module.exports = router;