const express = require('express')
const router = express.Router()
const { updateFarmImage, updateUserImage, deleteFarmImage } = require('../controllers/imageController')

router.patch('/users/:userId', updateUserImage);

router.patch('/farms/:farmId', updateFarmImage);

router.delete('/farms/:farmId', deleteFarmImage);

module.exports = router;