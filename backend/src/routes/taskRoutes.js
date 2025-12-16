const express = require('express');
const router = express.Router();
const { createTask, getAllTasks, getTasksByCrop, updateTask, deleteTask } = require('../controllers/taskController');
const { tokenValidator } = require('../middleware/authMiddleware');

router.post('/', tokenValidator, createTask);
router.get('/', tokenValidator, getAllTasks);
router.get('/crop/:cropId', tokenValidator, getTasksByCrop);
router.put('/:id', tokenValidator, updateTask);
router.delete('/:id', tokenValidator, deleteTask);

module.exports = router;