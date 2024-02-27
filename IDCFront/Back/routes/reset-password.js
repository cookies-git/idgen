const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const User = require('../models/userDB');

// Route handler for resetting password
router.post('/reset', async (req, res) => {
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

    // Send OTP to user's email
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
      subject: 'Reset Password OTP',
      text: `Your OTP for resetting your password is ${otp}. It will expire in 5 minutes.`
    };
    await transporter.sendMail(mailOptions);
    return res.json({ message: "OTP has been sent to your email.", Motp: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

// Route handler for verifying OTP and resetting password
router.post('/verify', async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
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
    // Hash new password using bcrypt
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    // Update user object with new password and remove OTP and expiration time
    user.password = hashedPassword;
    user.otp = undefined;
    user.otpExpire = undefined;
    await user.save();
    return res.json({ message: "Password has been reset." });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

module.exports = router;
