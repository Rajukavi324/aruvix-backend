const mongoose = require('mongoose')

const reportSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  issueType: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ""
  },
  location: {
    type: String,
    default: ""
  },
  contactNumber: {
    type: String,
    default: ""
  },
  photoBase64: {
    type: String,
    default: null
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Resolved', 'Closed'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 2592000 // auto-delete after 30 days (in seconds)
  }
}, { timestamps: { createdAt: false, updatedAt: true } })
// createdAt is defined manually above (with the TTL rule), so we tell
// Mongoose's automatic timestamps to only manage updatedAt, not createdAt

module.exports = mongoose.model('Report', reportSchema)