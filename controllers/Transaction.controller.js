import Transaction from '../models/Transaction.model.js';

export const createTransaction = async (req, res) => {
  try {
    const transaction = new Transaction(req.body);
    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().populate('product supplier');
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};