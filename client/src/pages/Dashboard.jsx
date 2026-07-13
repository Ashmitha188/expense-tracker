import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [expenses, setExpenses] = useState([]);

  // Fetch all expenses
  const fetchExpenses = async () => {
    try {
      const res = await api.get("/expenses");
      setExpenses(res.data);
    } catch (error) {
      console.error(error);
      alert("Unable to fetch expenses");
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Delete Expense
  const deleteExpense = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this expense?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/expenses/${id}`);
      fetchExpenses();
      alert("Expense Deleted Successfully");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Delete Failed");
    }
  };

  // Calculate totals
  const totalIncome = expenses
    .filter((item) => item.type === "Income")
    .reduce((sum, item) => sum + item.amount, 0);

  const totalExpense = expenses
    .filter((item) => item.type === "Expense")
    .reduce((sum, item) => sum + item.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <div className="dashboard">

      {/* Navbar */}
      <header className="navbar">
        <h2>💰 SpendWise</h2>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </header>

      {/* Summary Cards */}
      <section className="cards">

        <div className="card balance">
          <h3>Total Balance</h3>
          <h2>₹{balance}</h2>
        </div>

        <div className="card income">
          <h3>Total Income</h3>
          <h2>₹{totalIncome}</h2>
        </div>

        <div className="card expense">
          <h3>Total Expense</h3>
          <h2>₹{totalExpense}</h2>
        </div>

      </section>

      {/* Add Expense Button */}
      <div className="action-bar">

        <button
          className="add-btn"
          onClick={() => navigate("/expense")}
        >
          + Add Expense
        </button>

      </div>

      {/* Expense Table */}
      <div className="table-wrapper">
      <table>

        <thead>

          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Type</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>

        </thead>

        <tbody>

          {expenses.length === 0 ? (
            <tr>
              <td colSpan="6">No expenses found</td>
            </tr>
          ) : (
            expenses.map((expense) => (
              <tr key={expense._id}>
                <td>{expense.title}</td>
                <td>₹{expense.amount}</td>
                <td>{expense.category}</td>
                <td>{expense.type}</td>
                <td>
                  {new Date(expense.date).toLocaleDateString()}
                </td>

                <td>
                  <button
                    className="edit-btn"
                    onClick={() =>
                      navigate(`/expense/${expense._id}`)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteExpense(expense._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}

        </tbody>

      </table>
      </div>

    </div>
  );
}

export default Dashboard;