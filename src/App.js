import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';  
import store from './redux/store';
import BillForm from './components/BillForm';
import BillDashboard from './components/BillDashboard';
import BillChart from './components/BillChart';
import './App.css'; 

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="app-container">
          <h1 className="app-title">Bill Manager</h1>

          {}
          <nav className="navbar">
            <ul>
              <li>
                <Link to="/">Dashboard</Link>
              </li>
              <li>
                <Link to="/add">Add Bill</Link>
              </li>
              <li>
                <Link to="/bills">Added Bills</Link>
              </li>
            </ul>
          </nav>

          {}
          <Routes>
            <Route path="/" element={<BillChart />} />
            <Route path="/add" element={<BillForm />} />
            <Route path="/bills" element={<BillDashboard />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
