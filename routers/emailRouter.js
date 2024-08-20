const express = require('express')
const router = express.Router()
const emailController = require('../controllers/emailController')

router.post('/', emailController.createMessageEmailAllUser)
router.get('/', emailController.getAllEmail)
router.post('/remove/:email_id', emailController.removeEmailUser)

module.exports = router