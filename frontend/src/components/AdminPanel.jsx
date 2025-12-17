import { useEffect, useState } from "react";
import { getAllUsers, getInvestments, updateInvestmentStatus } from "../api";

export default function AdminPanel({ token }) {
  const [users, setUsers] = useState([]);
  const [investments, setInvestments] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await getAllUsers(token);
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchInvestments = async () => {
    try {
      const res = await getInvestments(token);
      setInvestments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const approveInvestment = async (id) => {
    try {
      await updateInvestmentStatus(id, "approved", token);
      fetchInvestments();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchInvestments();
  }, []);

  return (
    <div style={{ maxWidth: "800px", margin: "2rem auto" }}>
      <h2>Admin Panel</h2>
      <h3>All Users</h3>
      <ul>{users.map((user) => <li key={user._id}>{user.email}</li>)}</ul>
      <h3>All Investments</h3>
      <ul>
        {investments.map((inv) => (
          <li key={inv._id}>
            {inv.user.email} - {inv.plan} - ${inv.amount} - Status: {inv.status}
            {inv.status === "pending" && <button onClick={() => approveInvestment(inv._id)}>Approve</button>}
          </li>
        ))}
      </ul>
    </div>
  );
                                   }
