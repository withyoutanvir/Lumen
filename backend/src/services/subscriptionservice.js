<<<<<<< HEAD
import Subscription from "../models/Subscription.js";
=======
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
>>>>>>> 8a716605702482a80645d96f137cbd7025a39775

export const checkAutoRenewals = async () => {
  try {
    const now = new Date();
    const subscriptions = await Subscription.find({
      autoRenew: true,
      endDate: { $lte: now },
      status: { $ne: "cancelled" },
    }).populate("plan");

    for (let sub of subscriptions) {
      sub.status = "active";
      sub.startDate = now;
      sub.endDate = new Date(
        now.getTime() + sub.plan.durationDays * 24 * 60 * 60 * 1000
      );
      await sub.save();
      console.log(
        `✅ Auto-renewed subscription ${sub._id} for user ${sub.user}`
      );
    }
  } catch (err) {
    console.error("Auto-renew job failed:", err.message);
  }
};
