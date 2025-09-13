import UserSubscription from "../models/usersubscription.js";
import Usage from "../models/usage.js";
import Plan from "../models/plan.js";
import Discount from "../models/Discount.js";
/**
 * Create a new subscription for a user
 */
export async function createSubscription({
  userId,
  planId,
  autoRenew = false,
  discountCode,
}) {
  const plan = await Plan.findById(planId);
  if (!plan) throw new Error("Plan not found");

  let discount = null;
  if (discountCode) {
    discount = await Discount.findOne({ code: discountCode, active: true });
    if (!discount) throw new Error("Invalid discount code");
  }

  return UserSubscription.create({
    user: userId,
    plan: plan._id,
    autoRenew,
    appliedDiscount: discount ? discount._id : null,
    status: "active",
  });
}

/**
 * Cancel an existing subscription
 */
export async function cancelSubscription({ userId, subscriptionId, note }) {
  const sub = await UserSubscription.findById(subscriptionId);
  if (!sub) throw new Error("Subscription not found");
  if (!sub.user.equals(userId)) throw new Error("Not authorized");

  sub.status = "cancelled";
  sub.endDate = new Date();
  sub.history.push({ date: new Date(), action: "cancel", note: note || "" });
  await sub.save();

  return sub;
}

/**
 * Change plan (upgrade or downgrade)
 */
export async function changePlan({ userId, subscriptionId, newPlanId }) {
  const sub = await UserSubscription.findById(subscriptionId);
  if (!sub) throw new Error("Subscription not found");
  if (!sub.user.equals(userId)) throw new Error("Not authorized");

  const newPlan = await Plan.findById(newPlanId);
  if (!newPlan) throw new Error("Target plan not found");

  sub.plan = newPlan._id;
  sub.history.push({
    date: new Date(),
    action: "change_plan",
    note: `Changed to ${newPlan.name}`,
  });
  await sub.save();

  return sub;
}

/**
 * Get all subscriptions for a specific user
 */
export async function listUserSubscriptions(userId) {
  return UserSubscription.find({ user: userId }).populate(
    "plan appliedDiscount"
  );
}

/**
 * Record usage (e.g., data consumption) for a subscription
 */
export async function recordUsage({ userId, subscriptionId, bytesUsed }) {
  const sub = await UserSubscription.findById(subscriptionId);
  if (!sub) throw new Error("Subscription not found");
  if (!sub.user.equals(userId)) throw new Error("Not authorized");

  // create a usage record
  await Usage.create({ subscription: sub._id, bytesUsed });

  // update running total (in GB)
  const gb = bytesUsed / 1024 ** 3;
  sub.usageThisPeriodGB = (sub.usageThisPeriodGB || 0) + gb;
  await sub.save();

  return { subscription: sub._id, totalUsageGB: sub.usageThisPeriodGB };
}
