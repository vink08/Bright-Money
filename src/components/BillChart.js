
import React from 'react';
import { useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area } from 'recharts';
import './BillChart.css';

const BillChart = () => {
  const { bills } = useSelector((state) => state.bills);

  const data = bills.reduce((acc, bill) => {
    const month = new Date(bill.date).toLocaleString('default', { month: 'short' });
    const existing = acc.find((item) => item.month === month);
    if (existing) {
      existing.amount += parseFloat(bill.amount);
    } else {
      acc.push({ month, amount: parseFloat(bill.amount) });
    }
    return acc;
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <div className="tooltip-content">
            <span className="tooltip-month">{label}</span>
            <span className="tooltip-amount">${payload[0].value.toFixed(2)}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3 className="chart-title">Monthly Spending</h3>
        <div className="chart-controls">
          <button className="control-button active">NEW</button>
          <button className="control-button">Trends</button>
        </div>
      </div>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563EB" stopOpacity={0.2}/>
                <stop offset="100%" stopColor="#2563EB" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#2563EB"/>
                <stop offset="100%" stopColor="#60A5FA"/>
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="rgba(148, 163, 184, 0.1)"
              horizontal={true}
              vertical={false}
            />
            <XAxis 
              dataKey="month" 
              tick={{ fill: '#64748B' }}
              axisLine={{ stroke: '#CBD5E1' }}
              tickLine={{ stroke: '#CBD5E1' }}
            />
            <YAxis 
              tick={{ fill: '#64748B' }}
              axisLine={{ stroke: '#CBD5E1' }}
              tickLine={{ stroke: '#CBD5E1' }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="none"
              fill="url(#areaGradient)"
              fillOpacity={1}
            />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="url(#lineGradient)"
              strokeWidth={3}
              dot={{ 
                fill: '#FFFFFF',
                stroke: '#2563EB',
                strokeWidth: 2,
                r: 6,
              }}
              activeDot={{ 
                fill: '#2563EB',
                stroke: '#FFFFFF',
                strokeWidth: 3,
                r: 8 
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BillChart;
