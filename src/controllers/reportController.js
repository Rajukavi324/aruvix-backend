const Report = require('../models/Report')

// Create a new report
exports.createReport = async (req, res) => {
  try {
    const { issueType, description, location, contactNumber, photoBase64 } = req.body

    if (!issueType) {
      return res.status(400).json({ message: 'Issue type is required' })
    }

    const report = await Report.create({
      user: req.userId,
      issueType,
      description,
      location,
      contactNumber,
      photoBase64
    })

    res.status(201).json({
      message: 'Report submitted successfully!',
      report
    })

  } catch (error) {
    console.log('❌ ERROR (createReport):', error.message)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// Get all reports submitted by the logged-in user
exports.getMyReports = async (req, res) => {
  try {
    const reports = await Report.find({ user: req.userId }).sort({ createdAt: -1 })
    res.json({ reports })
  } catch (error) {
    console.log('❌ ERROR (getMyReports):', error.message)
    res.status(500).json({ message: 'Server error' })
  }
}