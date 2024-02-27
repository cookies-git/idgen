const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env['JWT_SECRET'];

function verifyJWT(req, res, next) {
  // removes 'Bearer` from token
  const token = req.headers["x-access-token"]?.split(' ')[1]

  if (token) {
    //token verifying
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) return res.json({
        isLoggedIn: false,
        message: "Failed To Authenticate"
      })
      req.user = {};
      req.user.id = decoded.id
      req.user.email = decoded.email
      req.user.role = decoded.role
      req.user.name = decoded.name
      req.user.phone = decoded.phone

      next()
    })
  } else {
    res.json({ message: "Incorrect Token Given", isLoggedIn: false })
  }
}

module.exports = verifyJWT;