const express = require('express');
const app = express();
const cors = require('cors');
const User = require('./models/userDB')
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const isUserAuth = require('./routes/userAuth');
const signUPRouter = require('./routes/signUp2');
const resetPassword = require('./routes/reset-password');



//cors
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(function(req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
//cors ends here

app.get("/", (req, res) => {
  return res.json(message = `Server is Running now`)
})
app.get('/users', (req, res) => {
  const users = {
    name: 'John', age: 30
  };
  res.json(users);
});

app.use('/signup', usersRouter);
app.use('/login', loginRouter);
app.use('/isUserAuth', isUserAuth);
app.use('/signup', usersRouter);
app.use('/signup2', signUPRouter);
app.use('/password', resetPassword);



console.log(User)

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}`));