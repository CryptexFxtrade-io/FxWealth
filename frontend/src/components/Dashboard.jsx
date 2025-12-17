import { useEffect, useState } from "react";
import { getUser, getInvestments } from "../api";
import InvestmentForm from "./InvestmentForm";

export default function Dashboard({ token }) {
  const [user, setUser] = useState(null);
  const [investments, setInvestments] = useState([]);

  const fetchUser = async () => {
    try {
      const res = await getUser(token);
      setUser(res.data);
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

  useEffect(() => {
    fetchUser();
    fetchInvestments();
  }, []);

  return (
    <div>
      <h2>Welcome, {user?.email}</h2>
      <InvestmentForm token={token} onSuccess={fetchInvestments} />
      <h3>Your Investments</h3>
      <ul>
        {investments.map((inv) => (
          <li key={inv._id}>
            {inv.plan} - ${inv.amount} - Status: {inv.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
