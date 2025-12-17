import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";

function App() {
  const [token, setToken] = useState(localStorage.getItem("fxToken"));

  return (
    <Router>
      <Navbar token={token} setToken={setToken} />
      <Routes>
        <Route path="/" element={token ? <Dashboard token={token} /> : <Navigate to="/auth" />} />
        <Route path="/auth" element={!token ? <AuthForm setToken={setToken} /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
