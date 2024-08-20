const express = require('express')
const router = express.Router()
const culinaryController = require('../controllers/culinaryController')

router.post('/', culinaryController.createCulinary)
router.get('/', culinaryController.getAllCulinary)
router.post('/update/:culinary_id', culinaryController.updateCulinary)
router.post('/remove/:culinary_id', culinaryController.removeCulinary)

module.exports = router