import { useState } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export default function AuthForm({ setToken }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isLogin
        ? `${API}/auth/login`
        : `${API}/auth/register`;

      console.log("Submitting to:", url);

      const res = await axios.post(url, { email, password });

      console.log("Response:", res.data);

      localStorage.setItem("fxToken", res.data.token);
      setToken(res.data.token);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "API ERROR");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto", textAlign: "center" }}>
      <h2>{isLogin ? "Login" : "Create Account"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br /><br />

        <button type="submit" disabled={loading}>
          {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
        </button>
      </form>

      <p
        style={{ marginTop: 20, cursor: "pointer", color: "blue" }}
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin
          ? "Don't have an account? Create one"
          : "Already have an account? Login"}
      </p>
    </div>
  );
      }
