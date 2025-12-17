import React, { useEffect, useState } from 'react';
import { api } from '../services/api';

function Dashboard() {
  const [investments, setInvestments] = useState([]);

  useEffect(() => {
    api('/api/investments').then(setInvestments);
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        {investments.map(inv => (
          <li key={inv._id}>
            {inv.plan} - Amount: ${inv.amount} - Profit: ${inv.profit}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
