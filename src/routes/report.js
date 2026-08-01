const express = require('express')
const router = express.Router()
const { createReport, getMyReports } = require('../controllers/reportController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, createReport)
router.get('/my-reports', authMiddleware, getMyReports)

module.exports = router