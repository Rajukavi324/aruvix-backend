const express = require('express')
const router = express.Router()
const { getAlerts, dismissAlert } = require('../controllers/alertController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', authMiddleware, getAlerts)
router.patch('/:id/dismiss', authMiddleware, dismissAlert)

module.exports = router