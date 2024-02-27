const express = require('express');
const verifyJWT = require('./verifyJWT');
const router = express.Router();


router.get("/", verifyJWT, (req, res) => {
  return res.json({
    isLoggedIn: true,
    email: req.user.email,
    id: req.user.id,
    role: req.user.role
  })
})

module.exports = router;
