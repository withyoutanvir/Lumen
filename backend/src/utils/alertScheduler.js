import cron from "node-cron";
import { checkAutoRenewals } from "../services/subscriptionservice.js";

// Runs every day at midnight
export const startSubscriptionScheduler = () => {
  cron.schedule("0 0 * * *", async () => {
    console.log("⏰ Running daily subscription auto-renew job...");
    await checkAutoRenewals();
  });
};
