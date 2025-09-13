import Subscription from "../models/Subscription.js";

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
