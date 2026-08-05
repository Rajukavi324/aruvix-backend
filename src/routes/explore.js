const express = require('express')
const router = express.Router()
const { getExploreItems, createExploreItem } = require('../controllers/exploreController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', authMiddleware, getExploreItems)
router.post('/', authMiddleware, createExploreItem)

module.exports = router