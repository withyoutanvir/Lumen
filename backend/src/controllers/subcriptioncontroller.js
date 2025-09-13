import Subscription from "../models/Subscription.js";
import Plan from "../models/Plan.js";

// Create new subscription
export const createSubscription = async (req, res) => {
  try {
    const { planId, autoRenew } = req.body;
    const userId = req.user.id; // From auth middleware

    const plan = await Plan.findById(planId);
    if (!plan) return res.status(404).json({ message: "Plan not found" });

    const subscription = await Subscription.create({
      user: userId,
      plan: planId,
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days validity
      autoRenew,
    });

    res.status(201).json(subscription);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Upgrade/Downgrade subscription
export const modifySubscription = async (req, res) => {
  try {
    const { subscriptionId } = req.params;
    const { planId } = req.body;

    const plan = await Plan.findById(planId);
    if (!plan) return res.status(404).json({ message: "New plan not found" });

    const subscription = await Subscription.findById(subscriptionId);
    if (!subscription)
      return res.status(404).json({ message: "Subscription not found" });

    subscription.plan = planId;
    subscription.updatedAt = Date.now();
    await subscription.save();

    res.json(subscription);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Cancel subscription
export const cancelSubscription = async (req, res) => {
  try {
    const { subscriptionId } = req.params;

    const subscription = await Subscription.findById(subscriptionId);
    if (!subscription)
      return res.status(404).json({ message: "Subscription not found" });

    subscription.status = "cancelled";
    subscription.endDate = Date.now();
    await subscription.save();

    res.json({ message: "Subscription cancelled", subscription });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Renew subscription
export const renewSubscription = async (req, res) => {
  try {
    const { subscriptionId } = req.params;

    const subscription = await Subscription.findById(subscriptionId);
    if (!subscription)
      return res.status(404).json({ message: "Subscription not found" });

    subscription.status = "active";
    subscription.endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    await subscription.save();

    res.json({ message: "Subscription renewed", subscription });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get user subscriptions
export const getUserSubscriptions = async (req, res) => {
  try {
    const userId = req.user.id;
    const subscriptions = await Subscription.find({ user: userId }).populate(
      "plan"
    );
    res.json(subscriptions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
