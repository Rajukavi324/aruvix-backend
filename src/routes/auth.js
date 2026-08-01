const express = require('express')
const router = express.Router()
const { sendOtp, verifyOtp, getProfile } = require('../controllers/authController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/send-otp', sendOtp)
router.post('/verify-otp', verifyOtp)
router.get('/profile', authMiddleware, getProfile)

module.exports = router