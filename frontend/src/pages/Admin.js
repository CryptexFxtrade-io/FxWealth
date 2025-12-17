import React, { useEffect, useState } from 'react';
import { api } from '../services/api';

function Admin() {
  const [stats, setStats] = useState({ users: 0, investments: 0 });

  useEffect(() => {
    api('/api/admin/stats').then(setStats);
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Total Users: {stats.users}</p>
      <p>Total Investments: {stats.investments}</p>
    </div>
  );
}

export default Admin;
