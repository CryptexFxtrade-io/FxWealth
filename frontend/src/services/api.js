import React, { useEffect, useState } from "react";
import { login, getUser } from "./services/auth";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUser();
        setUser(data);
      } catch (err) {
        console.log("Not logged in");
      }
    };
    fetchUser();
  }, []);

  const handleLogin = async () => {
    try {
      const data = await login("test@example.com", "password123");
      localStorage.setItem("token", data.token);
      setUser(data.user);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div>
      <h1>FxWealth Dashboard</h1>
      {user ? (
        <p>Welcome, {user.name}</p>
      ) : (
        <button onClick={handleLogin}>Login Demo</button>
      )}
    </div>
  );
}

export default App;
