const express = require('express');
const router = express.Router();
const {createActivity, getAllActivities, getActivitiesByCrop, getActivityById, updateActivity, deleteActivity} = require('../controllers/activityController');
const { tokenValidator } = require('../middleware/authMiddleware')


router.post('/', tokenValidator, createActivity);

router.get('/', tokenValidator, getAllActivities);

router.get('/crop/:cropId', tokenValidator, getActivitiesByCrop);

router.get('/:id', tokenValidator, getActivityById);

router.put('/:id', tokenValidator, updateActivity);

router.delete('/:id', tokenValidator, deleteActivity);

module.exports = router;