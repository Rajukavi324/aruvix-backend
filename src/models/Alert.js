const mongoose = require('mongoose')

const alertSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['EMERGENCY', 'WARNING', 'INFO'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  location: {
    type: String,
    default: ""
  },
  description: {
    type: String,
    default: ""
  },
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  active: {
    type: Boolean,
    default: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Alert', alertSchema)