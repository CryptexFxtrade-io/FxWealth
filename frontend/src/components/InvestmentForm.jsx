import { useState } from "react";
import { createInvestment } from "../api";

export default function InvestmentForm({ token, onSuccess }) {
  const [plan, setPlan] = useState("");
  const [amount, setAmount] = useState("");

  const handleInvest = async (e) => {
    e.preventDefault();
    try {
      await createInvestment({ plan, amount }, token);
      setPlan("");
      setAmount("");
      onSuccess();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to invest");
    }
  };

  return (
    <form onSubmit={handleInvest}>
      <input placeholder="Plan" value={plan} onChange={(e) => setPlan(e.target.value)} required />
      <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
      <button type="submit">Invest</button>
    </form>
  );
}
