const mongoose = require('mongoose')

const exploreSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ['Hotel', 'Guide', 'Traveler'],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: String,
    default: ""
  },
  distance: {
    type: String,
    default: ""
  },
  tag: {
    type: String,
    default: ""
  },
  expertise: {
    type: String,
    default: ""
  },
  experience: {
    type: String,
    default: ""
  },
  languages: {
    type: String,
    default: ""
  },
  note: {
    type: String,
    default: ""
  },
  rating: {
    type: Number,
    default: 0
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true })

module.exports = mongoose.model('Explore', exploreSchema)