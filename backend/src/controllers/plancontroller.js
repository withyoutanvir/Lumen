import Plan from "../models/Plan.js";
import User from "../models/usermodel.js";

//  Helper: validate user + admin
const checkAdmin = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");
  if (user.role !== "admin") throw new Error("Access denied. Only admins can perform this action.");
  return user;
};

//  Create a new plan (Admin by email)
export const createPlan = async (req, res) => {
  try {
    const { email, plans } = req.body;
    await checkAdmin(email);

    if (!plans) {
      return res.status(400).json({ success: false, message: "Plans data is required" });
    }

    let newPlans;

    if (Array.isArray(plans)) {
      if (plans.length === 0) {
        return res.status(400).json({ success: false, message: "Plans array cannot be empty" });
      }
      // Bulk insert
      newPlans = await Plan.insertMany(plans);
    } else if (typeof plans === 'object') {
      // Single insert
      const plan = new Plan(plans);
      newPlans = await plan.save();
    } else {
      return res.status(400).json({ success: false, message: "Invalid plans format" });
    }

    res.status(201).json({ success: true, data: newPlans });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};



export const getPlansByEmail = async (req, res) => {
  try {
    const { email, includeInactive } = req.body;
    await checkAdmin(email);

    // Fetch plans: active by default, include inactive if requested
    const filter = includeInactive ? {} : { isActive: true };
    const plans = await Plan.find(filter);

    res.json({ success: true, data: plans });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


//  Get a single plan (Admin by email + plan name)
export const getPlanByEmail = async (req, res) => {
  try {
    const { email, name } = req.body;
    await checkAdmin(email);

    const plan = await Plan.findOne({ name });
    if (!plan) return res.status(404).json({ success: false, message: "Plan not found" });

    res.json({ success: true, data: plan });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//  Update plan (Admin by email + plan name)
export const updatePlanByEmail = async (req, res) => {
  try {
    const { email, name, ...updateData } = req.body;
    await checkAdmin(email);

    const plan = await Plan.findOneAndUpdate({ name }, updateData, { new: true });
    if (!plan) return res.status(404).json({ success: false, message: "Plan not found" });

    res.json({ success: true, message: "Plan updated successfully", data: plan });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

//  Delete plan (Admin by email + plan name)

export const deletePlanByEmail = async (req, res) => {
  try {
    const { email, name } = req.body;
    await checkAdmin(email);

    // Find the plan
    const plan = await Plan.findOne({ name });
    if (!plan) return res.status(404).json({ success: false, message: "Plan not found" });

    // Check if any active subscriptions exist for this plan
    const activeSubs = await Subscription.find({ planId: plan._id, status: "active" });
    if (activeSubs.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete plan, there are active subscriptions",
      });
    }

    // Soft delete: mark plan as inactive
    plan.isActive = false;
    await plan.save();

    res.json({ success: true, message: "Plan deactivated successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//  Add discount (Admin by email + plan name)
export const addDiscountByEmail = async (req, res) => {
  try {
    const { email, name, discount } = req.body;
    await checkAdmin(email);

    const plan = await Plan.findOne({ name });
    if (!plan) return res.status(404).json({ success: false, message: "Plan not found" });

    plan.discounts.push(discount);
    await plan.save();

    res.json({ success: true, message: "Discount added successfully", data: plan });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

//  Remove discount (Admin by email + plan name)
export const removeDiscountByEmail = async (req, res) => {
  try {
    const { email, name, discountId } = req.body;
    await checkAdmin(email);

    const plan = await Plan.findOne({ name });
    if (!plan) return res.status(404).json({ success: false, message: "Plan not found" });

    plan.discounts = plan.discounts.filter((d) => d._id.toString() !== discountId);
    await plan.save();

    res.json({ success: true, message: "Discount removed successfully", data: plan });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
