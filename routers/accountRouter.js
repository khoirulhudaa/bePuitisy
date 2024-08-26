const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const upload = require('../config/multer')

router.post('/signin', authController.signin)
router.post('/signup', authController.signup)
router.get('/', authController.getAllAccounts)
router.get('/:user_id', authController.getAccountById)
router.get('/check-token/:token', authController.getAccountByToken)
router.post('/remove/:user_id', authController.removeAccount)
router.put('/update/:user_id', upload.single('avatar'), authController.updateAccount)
router.put('/reset-password/:user_id', authController.updatePassword)

module.exports = router