const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

router.post('/signin', authController.signin)
router.post('/signup', authController.signup)
router.get('/', authController.getAllUAccount)
router.post('/remove/:user_id', authController.removeAccount)
router.post('/update/:user_id', authController.updateAccount)

module.exports = router