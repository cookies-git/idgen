const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../models/userDB');
const Joi = require("joi");
const router = express.Router();
const JWT_SECRET = process.env['JWT_SECRET'];

//Joi

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required()
})

const loginValidation = (data => {
  return loginSchema.validate(data);
})

//Joi Ends


router.post("/", (req, res) => {
  const userLoggingIn = req.body;

  if (!userLoggingIn) return res.json({ message: "Server Error" })

  const validationError = loginValidation(userLoggingIn).error

  if (validationError) {
    return res.json({ message: validationError.details[0].message })
  } else {
    Users.findOne({ email: userLoggingIn.email.toLowerCase() })
      .then(dbUser => {
        if (!dbUser) {
          return res.json({ message: "Invalid Email or Password" })
        }
        //bcrypt checking password
        bcrypt.compare(userLoggingIn.password, dbUser.password)
          .then(isCorrect => {
            if (isCorrect) {
              const payload = {
                id: dbUser._id,
                email: dbUser.email,
                role: dbUser.role,
                name: dbUser.name,
                phone: dbUser.phone

              }
              jwt.sign(
                payload,
                JWT_SECRET,
                { expiresIn: 86400 },
                (err, token) => {
                  return res.json({ message: "Success", token: "Bearer " + token })
                }
              )
            } else {
              return res.json({ message: "Invalid Username or Password" })
            }
          })

      })
  }
})

module.exports = router;
