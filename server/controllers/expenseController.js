const Expense = require("../models/Expense");

// ==========================
// Add Expense
// ==========================
const addExpense = async (req, res) => {
    try {

        const { title, amount, category, type, date } = req.body;

        if (!title || !amount || !category || !type || !date) {
            return res.status(400).json({
                message: "Please fill all fields"
            });
        }

        const expense = await Expense.create({
            title,
            amount,
            category,
            type,
            date,
            user: req.user.id
        });

        res.status(201).json({
            message: "Expense Added Successfully",
            expense
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// ==========================
// Get All Expenses
// ==========================
const getExpenses = async (req, res) => {
    try {

        const expenses = await Expense.find({
            user: req.user.id
        }).sort({ date: -1 });

        res.status(200).json(expenses);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// ==========================
// Get Single Expense
// ==========================
const getExpenseById = async (req, res) => {
    try {

        const expense = await Expense.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!expense) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        res.status(200).json(expense);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// ==========================
// Update Expense
// ==========================
const updateExpense = async (req, res) => {

    try {

        const expense = await Expense.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!expense) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        expense.title = req.body.title || expense.title;
        expense.amount = req.body.amount || expense.amount;
        expense.category = req.body.category || expense.category;
        expense.type = req.body.type || expense.type;
        expense.date = req.body.date || expense.date;

        const updatedExpense = await expense.save();

        res.status(200).json({
            message: "Expense Updated Successfully",
            updatedExpense
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// ==========================
// Delete Expense
// ==========================
const deleteExpense = async (req, res) => {

    try {

        const expense = await Expense.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!expense) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        await expense.deleteOne();

        res.status(200).json({
            message: "Expense Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    addExpense,
    getExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense
};