const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: ""
  },
  location: {
    type: String,
    default: ""
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  otp: {
    type: String
  },
  otpExpiry: {
    type: Date
  },
  isVerified: {
    type: Boolean,
    default: false
  }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)