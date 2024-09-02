const express = require('express')
const router = express.Router()
const poetryController = require('../controllers/poetryController')

router.post('/:user_id/:book_id', poetryController.createPoetry)
router.get('/', poetryController.getAllPoetry)
router.get('/all/:authorId', poetryController.getAllPoetryByAuthorId)
router.get('/:book_id', poetryController.getAllPoetryByBookId)
router.put('/update/:poetry_id', poetryController.updatePoetry)
router.delete('/remove/:poetry_id', poetryController.removePoetry)
router.delete('/remove/all/:book_id', poetryController.removePoetryByBookId)

module.exports = router