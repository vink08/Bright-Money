
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteBill, filterBills, setHighlightedBills, editBill, updateBudget } from '../redux/actions';
import './BillDashboard.css';

const BillDashboard = () => {
  const { bills, filteredCategory, highlightedBills, monthlyBudget } = useSelector((state) => state.bills);
  const dispatch = useDispatch();
  const [editingBill, setEditingBill] = useState(null);
  const [userBudget, setUserBudget] = useState(monthlyBudget);

  const filteredBills = filteredCategory
    ? bills.filter((bill) => bill.category === filteredCategory)
    : bills;

  const calculateHighlightedBills = () => {
    if (!userBudget) {
      alert('Please enter a budget');
      return;
    }
    
    let sortedBills = [...bills].sort((a, b) => parseFloat(a.amount) - parseFloat(b.amount));
    let total = 0;
    let highlighted = [];

    for (let bill of sortedBills) {
      if (total + parseFloat(bill.amount) <= userBudget) {
        total += parseFloat(bill.amount);
        highlighted.push(bill.id);
      } else {
        break;
      }
    }

    dispatch(updateBudget(userBudget));
    dispatch(setHighlightedBills(highlighted));
  };

  const handleEdit = (bill) => {
    setEditingBill(bill);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(editBill(editingBill));
    setEditingBill(null);
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Bill Dashboard</h2>
      
      <div className="budget-section">
        <input
          type="number"
          value={userBudget}
          onChange={(e) => setUserBudget(parseFloat(e.target.value))}
          className="budget-input"
          placeholder="Enter monthly budget"
        />
        <button className="highlight-btn" onClick={calculateHighlightedBills}>
          Highlight Bills Within Budget
        </button>
      </div>

      <select className="category-select" onChange={(e) => dispatch(filterBills(e.target.value))}>
        <option value="">All Categories</option>
        {Array.from(new Set(bills.map((bill) => bill.category))).map((category) => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
      
      <ul className="bills-list">
        {filteredBills.map((bill) => (
          <li
            key={bill.id}
            className={`bill-item ${highlightedBills.includes(bill.id) ? 'highlighted' : ''}`}
          >
            {editingBill && editingBill.id === bill.id ? (
              <form onSubmit={handleUpdate} className="edit-form">
                <input
                  type="text"
                  value={editingBill.description}
                  onChange={(e) => setEditingBill({ ...editingBill, description: e.target.value })}
                  className="edit-input"
                />
                <input
                  type="text"
                  value={editingBill.category}
                  onChange={(e) => setEditingBill({ ...editingBill, category: e.target.value })}
                  className="edit-input"
                />
                <input
                  type="number"
                  value={editingBill.amount}
                  onChange={(e) => setEditingBill({ ...editingBill, amount: e.target.value })}
                  className="edit-input"
                />
                <input
                  type="date"
                  value={editingBill.date}
                  onChange={(e) => setEditingBill({ ...editingBill, date: e.target.value })}
                  className="edit-input"
                />
                <button type="submit" className="save-btn">Save</button>
                <button type="button" className="cancel-btn" onClick={() => setEditingBill(null)}>Cancel</button>
              </form>
            ) : (
              <div className="bill-details">
                <div className="bill-detail">
                  <div className="bill-description">{bill.description}</div>
                  <div className="bill-category">{bill.category}</div>
                  <div className="bill-amount">Rs {bill.amount}</div>
                  <div className="bill-date">{bill.date}</div>
                </div>
                <div className="bill-actions">
                  <button className="edit-btn" onClick={() => handleEdit(bill)}>Edit</button>
                  <button className="delete-btn" onClick={() => dispatch(deleteBill(bill.id))}>Delete</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
      <h3 className="total-amount">Total: ${filteredBills.reduce((sum, bill) => sum + parseFloat(bill.amount), 0)}</h3>
    </div>
  );
};

export default BillDashboard;

