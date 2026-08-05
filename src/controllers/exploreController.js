const Explore = require('../models/Explore')

exports.getExploreItems = async (req, res) => {
  try {
    const { category } = req.query
    const filter = category ? { category } : {}
    const items = await Explore.find(filter).sort({ createdAt: -1 })
    res.json({ items })
  } catch (error) {
    console.log('❌ ERROR (getExploreItems):', error.message)
    res.status(500).json({ message: 'Server error' })
  }
}

exports.createExploreItem = async (req, res) => {
  try {
    const data = { ...req.body, postedBy: req.userId }
    const item = await Explore.create(data)
    res.status(201).json({ message: 'Added successfully!', item })
  } catch (error) {
    console.log('❌ ERROR (createExploreItem):', error.message)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}