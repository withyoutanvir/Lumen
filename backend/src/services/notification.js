import Notification from '../models/Notification.js';

/**
 * Send a notification to a user
 * @param {ObjectId} userId - The user's MongoDB ObjectId
 * @param {String} title - Notification title
 * @param {String} message - Notification message
 * @param {String} type - Notification type (info, warning, success, error)
 */
export async function sendNotification({ userId, title, message, type = 'info' }) {
  return Notification.create({
    user: userId,
    title,
    message,
    type
  });
}

/**
 * Mark all notifications as read for a user
 */
export async function markAllAsRead(userId) {
  return Notification.updateMany({ user: userId, isRead: false }, { isRead: true });
}

/**
 * Delete all notifications for a user
 */
export async function deleteAllNotifications(userId) {
  return Notification.deleteMany({ user: userId });
}
