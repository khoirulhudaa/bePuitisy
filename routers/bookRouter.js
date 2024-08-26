const express = require('express')
const router = express.Router()
const bookController = require('../controllers/bookController')
const upload = require('../config/multer')

router.post('/:user_id', upload.single('cover'), bookController.createBook)
router.get('/', bookController.getAllBook)
router.get('/:book_id', bookController.getBookById)
router.get('/author/:user_id', bookController.getBookByAuthorId)
router.put('/update/:book_id', upload.single('cover'), bookController.updateBook)

module.exports = router