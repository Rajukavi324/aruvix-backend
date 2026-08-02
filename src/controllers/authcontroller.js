const User = require('../models/user')
const jwt = require('jsonwebtoken')

// Generate a random 6-digit OTP
function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// Step 1: Send OTP to a phone number
exports.sendOtp = async (req, res) => {
  try {
    const { phone } = req.body

    if (!phone) {
      return res.status(400).json({ message: 'Phone number is required' })
    }

    const otp = generateOtp()
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000) // valid for 5 minutes

    let user = await User.findOne({ phone })

    if (!user) {
      // New user - create with just phone + otp
      user = await User.create({ phone, otp, otpExpiry })
    } else {
      // Existing user - update their otp
      user.otp = otp
      user.otpExpiry = otpExpiry
      await user.save()
    }

    // 🔔 DEMO MODE: no real SMS sent, OTP is shown here instead
    console.log(`📱 OTP for ${phone}: ${otp}`)

    res.json({
      message: 'OTP sent successfully (demo mode - check server console)',
      demoOtp: otp // ⚠️ remove this field later when you add real SMS
    })

  } catch (error) {
    console.log('❌ ERROR (sendOtp):', error.message)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// Step 2: Verify OTP and log the user in
exports.verifyOtp = async (req, res) => {
  try {
    const { phone, otp, name } = req.body

    if (!phone || !otp) {
      return res.status(400).json({ message: 'Phone and OTP are required' })
    }

    const user = await User.findOne({ phone })

    if (!user) {
      return res.status(400).json({ message: 'Phone number not found, please request OTP first' })
    }

    console.log(`🔍 Comparing - Stored OTP: "${user.otp}" | Entered OTP: "${otp}"`)

    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' })
    }

    if (user.otpExpiry < new Date()) {
      return res.status(400).json({ message: 'OTP expired, please request a new one' })
    }

    // OTP correct - clear it and mark verified
    user.otp = undefined
    user.otpExpiry = undefined
    user.isVerified = true

    // If a name was sent (Sign Up flow) and user doesn't have one yet, save it
    if (name && !user.name) {
      user.name = name
    }

    await user.save()

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    })

    res.json({
      message: 'Login successful!',
      token,
      user: { id: user._id, phone: user.phone, name: user.name }
    })

  } catch (error) {
    console.log('❌ ERROR (verifyOtp):', error.message)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// Get logged-in user's profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-otp -otpExpiry')
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.json({ user })
  } catch (error) {
    console.log('❌ ERROR (getProfile):', error.message)
    res.status(500).json({ message: 'Server error' })
  }
}