export default function Navbar({ token, setToken }) {
  const logout = () => {
    localStorage.removeItem("fxToken");
    setToken(null);
  };
  return (
    <nav>
      <h1>FxWealth</h1>
      {token && <button onClick={logout}>Logout</button>}
    </nav>
  );
}
