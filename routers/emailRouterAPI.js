const express = require('express')
const router = express.Router()
const emailController = require('../controllers/emailController')

router.post('/', emailController.addNewEmail)

module.exports = router