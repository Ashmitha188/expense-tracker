import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./ExpenseForm.css";

function ExpenseForm() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        amount: "",
        category: "",
        type: "Expense",
        date: ""
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.post("/expenses", formData);

            alert("Expense Added Successfully");

            navigate("/dashboard");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to add expense"
            );

        }

    };

    return (

        <div className="expense-container">

            <div className="expense-card">

                <h2>Add Expense</h2>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="number"
                        name="amount"
                        placeholder="Amount"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                    />

                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="Food">Food</option>
                        <option value="Travel">Travel</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Salary">Salary</option>
                        <option value="Bills">Bills</option>
                        <option value="Health">Health</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Other">Other</option>
                    </select>

                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                    >
                        <option value="Expense">Expense</option>
                        <option value="Income">Income</option>
                    </select>

                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">
                        Save Expense
                    </button>

                </form>

            </div>

        </div>

    );

}

export default ExpenseForm;