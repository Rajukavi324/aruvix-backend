const Alert = require('../models/Alert')

exports.getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find({ active: true }).sort({ createdAt: -1 })
    res.json({ alerts })
  } catch (error) {
    console.log('❌ ERROR (getAlerts):', error.message)
    res.status(500).json({ message: 'Server error' })
  }
}

exports.dismissAlert = async (req, res) => {
  try {
    const { id } = req.params
    await Alert.findByIdAndUpdate(id, { active: false })
    res.json({ message: 'Alert dismissed' })
  } catch (error) {
    console.log('❌ ERROR (dismissAlert):', error.message)
    res.status(500).json({ message: 'Server error' })
  }
}