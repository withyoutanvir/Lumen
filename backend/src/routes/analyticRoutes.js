import express from 'express';
import { protect, admin } from '../middleware/auth.js';
import {
  createAnalytic,
  getUserAnalytics,
  getAllAnalytics
} from '../controllers/analyticController.js';

const router = express.Router();

// Create analytic event
router.post('/', protect, createAnalytic);
// Get analytics for current user
router.get('/user', protect, getUserAnalytics);
// Get all analytics (admin only)
router.get('/all', protect, admin, getAllAnalytics);

export default router;
