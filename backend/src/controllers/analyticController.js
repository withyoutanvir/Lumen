import Analytic from '../models/analytic.js';

// Create a new analytic event
export const createAnalytic = async (req, res) => {
  try {
    const { user, event, details } = req.body;
    const analytic = await Analytic.create({ user, event, details });
    res.status(201).json(analytic);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all analytics for a user
export const getUserAnalytics = async (req, res) => {
  try {
    const analytics = await Analytic.find({ user: req.user._id }).sort({ timestamp: -1 });
    res.json(analytics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all analytics (admin only)
export const getAllAnalytics = async (req, res) => {
  try {
    const analytics = await Analytic.find().sort({ timestamp: -1 });
    res.json(analytics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
