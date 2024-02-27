const mongoose = require('mongoose');
const mySecret = process.env['DB_CONNECTION'];

mongoose.connect(mySecret, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to database');
  })
  .catch((error) => {
    console.log('Error connecting to database:', error);
  });

const userSchema = new mongoose.Schema({
  fname: { type: String, required: true },
  sname: { type: String, required: true },
  email: { type: String, required: true },
  dob: { type: Date },
  phone: { type: String },
  role: { type: String, enum: ['admin', 'user', 'bm'] },
  password: { type: String },
  createdAt: { type: Date, default: Date.now },
  otp: { type: String },
  otpExpire: { type: Date },
  isVerified: { type: Boolean }
});

const User = mongoose.model('User', userSchema);

module.exports = User;