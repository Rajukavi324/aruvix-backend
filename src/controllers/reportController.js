const Report = require('../models/Report')
const Alert = require('../models/Alert')

const HAZARD_TYPES = {
  'Water Contamination': 'EMERGENCY',
  'Pipeline Burst': 'EMERGENCY',
  'No Water Supply': 'WARNING',
  'Water Leakage': 'WARNING',
}

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

    if (HAZARD_TYPES[issueType]) {
      await Alert.create({
        type: HAZARD_TYPES[issueType],
        title: issueType,
        location: location || 'Location not specified',
        description: description || `A ${issueType.toLowerCase()} was just reported.`,
        reportedBy: req.userId
      })
    }

    res.status(201).json({
      message: 'Report submitted successfully!',
      report
    })

  } catch (error) {
    console.log('❌ ERROR (createReport):', error.message)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

exports.getMyReports = async (req, res) => {
  try {
    const reports = await Report.find({ user: req.userId }).sort({ createdAt: -1 })
    res.json({ reports })
  } catch (error) {
    console.log('❌ ERROR (getMyReports):', error.message)
    res.status(500).json({ message: 'Server error' })
  }
}