import express from 'express';
import { protect, admin } from '../middleware/auth.js';
import {
  createNotification,
  getUserNotifications,
  markAsRead,
  deleteNotification
} from '../controllers/notificationController.js';

const router = express.Router();

// Admin: create notification
router.post('/', protect, admin, createNotification);
// User: get own notifications
router.get('/', protect, getUserNotifications);
// User: mark notification as read
router.patch('/:id/read', protect, markAsRead);
// Admin: delete notification
router.delete('/:id', protect, admin, deleteNotification);

export default router;
