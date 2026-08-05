const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json({ limit: '10mb' }))

const authRoutes = require('./src/routes/auth')
app.use('/api/auth', authRoutes)

const reportRoutes = require('./src/routes/report')
app.use('/api/reports', reportRoutes)

const alertRoutes = require('./src/routes/alert')
app.use('/api/alerts', alertRoutes)

const exploreRoutes = require('./src/routes/explore')
app.use('/api/explore', exploreRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'Aruvix server is running!' })
})

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected!')
    app.listen(process.env.PORT || 3000, () => {
      console.log('✅ Server running on http://localhost:3000')
    })
  })
  .catch((err) => {
    console.log('❌ DB Error:', err.message)
  })