const express = require('express');
const router = express.Router();
const {createNotification, getNotificationById, getNotifications, getNotificationStats, markAllAsRead, markAsUnread, markAsRead, deleteAllRead, deleteNotification} = require('../controllers/notificationController');
const { tokenValidator } = require('../middleware/authMiddleware');

router.post('/', tokenValidator, createNotification);

router.get('/', tokenValidator, getNotifications);

router.get('/stats', tokenValidator, getNotificationStats);

router.patch('/read-all', tokenValidator, markAllAsRead);

router.delete('/read', tokenValidator, deleteAllRead);

router.get('/:id', tokenValidator, getNotificationById);

router.patch('/:id/read', tokenValidator, markAsRead);

router.patch('/:id/unread', tokenValidator, markAsUnread);

router.delete('/:id', tokenValidator, deleteNotification);

module.exports = router;