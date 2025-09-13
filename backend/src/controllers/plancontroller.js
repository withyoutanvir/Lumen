import planSchema from "../models/plan.js";
// import User from "../models/User.js";

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
    const { email, ...planData } = req.body;
    await checkAdmin(email);

    const plan = new Plan(planData);
    await plan.save();

    res.status(201).json({ success: true, data: plan });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

//  Get all plans (Admin by email)
export const getPlansByEmail = async (req, res) => {
  try {
    const { email } = req.body;
    await checkAdmin(email);

    const plans = await Plan.find();
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

    const plan = await Plan.findOneAndDelete({ name });
    if (!plan) return res.status(404).json({ success: false, message: "Plan not found" });

    res.json({ success: true, message: "Plan deleted successfully" });
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
