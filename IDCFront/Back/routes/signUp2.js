const express = require('express');
const router = express.Router();
const User = require('../models/userDB');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

// Route handler for creating a new user
// POST route to create a new user
router.post('/', async (req, res) => {
  try {
    // Get user input from request body
    let { fname, sname, email, dob, phone, password } = req.body;
    console.log(req.body);
    email = email.toLowerCase();
    const takenEmail = await User.findOne({ email })
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (takenEmail) {
      return res.json({ message: "Mail address has already been taken" });
    } else if (fname.trim() === '' || sname.trim() === '' || dob.trim() === '' || phone.trim() === '' || password.trim() === '') {
      return res.json({ message: "All fields are mandatory" });
    } else if (!regex.test(email)) {
      return res.json({ message: "Wrong mail address format" });
    }
    else {
      // Generate OTP
      const otp = Math.floor(100000 + Math.random() * 900000);

      // Send OTP via email
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env['mailaddress'],
          pass: process.env['gmailapppassword']
        },
      });

      let mailOptions = {
        from: '"no-reply" <your_email@gmail.com>',
        to: email,
        subject: "OTP for Account Confirmation",
        text: `Your OTP for confirming your account is ${otp}. This OTP is valid for 5 minutes. If you did not request this OTP, please ignore this email.`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      // Hash password using bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user object
      const newUser = new User({
        fname,
        sname,
        email,
        dob,
        phone,
        role: 'user',
        password: hashedPassword,
        isVerified: false,
        otp: otp,
        otpExpire: Date.now() + 5 * 60 * 1000 // OTP will expire after 5 minutes
      });

      // Save new user to database
      await newUser.save();
      return res.status(201).json({ message: "Account Created! Please check your email for OTP to complete the registration." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

// Route handler for resending OTP
router.post('/resend', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "User not found." });
    }
    // Generate new OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    // Update user object with new OTP and expiration time
    user.otp = otp;
    user.otpExpire = Date.now() + 5 * 60 * 1000; // OTP will expire after 5 minutes
    await user.save();

    //
    // Send new OTP to user's email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env['mailaddress'],
        pass: process.env['gmailapppassword']
      }
    });
    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: 'Your OTP has been resent',
      text: `Your OTP is ${otp}. It will expire in 5 minutes.`
    };
    await transporter.sendMail(mailOptions);
    return res.json({ message: "OTP has been resent to your email." });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

// Route handler for verifying OTP
router.post('/verify', async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "User not found." });
    }
    if (otp !== user.otp) {
      return res.json({ message: "Invalid OTP." });
    }
    if (Date.now() > user.otpExpire) {
      return res.json({ message: "OTP expired." });
    }
    // Update user object with verified status and remove OTP and expiration time
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpire = undefined;
    await user.save();
    return res.json({ message: "OTP verified." });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});


module.exports = router;
