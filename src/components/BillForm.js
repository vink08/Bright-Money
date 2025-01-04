import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBill } from '../redux/actions';
import './BillForm.css';

const BillForm = () => {
  const [formData, setFormData] = useState({
    id: Date.now(),
    description: '',
    category: '',
    amount: '',
    date: '',
  });
  const dispatch = useDispatch();
  const { bills, monthlyBudget } = useSelector((state) => state.bills);

  const totalAmount = bills.reduce((sum, bill) => sum + parseFloat(bill.amount), 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (totalAmount + parseFloat(formData.amount) > monthlyBudget) {
      alert('Cannot add bill. Budget exceeded!');
      return;
    }
    dispatch(addBill(formData));
    setFormData({ id: Date.now(), description: '', category: '', amount: '', date: '' });
    alert("Added")
  };

  return (
    <form onSubmit={handleSubmit} className="bill-form">
      <input
        type="text"
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        required
        className="form-input"
      />
      <input
        type="text"
        placeholder="Category"
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        required
        className="form-input"
      />
      <input
        type="number"
        placeholder="Amount"
        value={formData.amount}
        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        required
        className="form-input"
      />
      <input
        type="date"
        value={formData.date}
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        required
        className="form-input"
      />
      <button type="submit" className="submit-btn">Add Bill</button>
    </form>
  );
};

export default BillForm;
