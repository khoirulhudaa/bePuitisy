const express = require('express')
const router = express.Router()
const emailController = require('../controllers/emailController')

router.post('/forgot-password', emailController.createMessageEmailAllUser)

module.exports = router