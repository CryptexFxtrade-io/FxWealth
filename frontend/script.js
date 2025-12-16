const API = "https://https://fxwealth-backend.onrender.com;
const message = document.getElementById("message");

async function register() {
  const username = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!username || !email || !password) {
    message.textContent = "Please fill all fields";
    return;
  }

  const res = await fetch(`${API}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password })
  });

  const data = await res.json();
  message.textContent = data.message || "Registered successfully";
}

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    message.textContent = "Enter email and password";
    return;
  }

  const res = await fetch(`${API}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (data.token) {
    localStorage.setItem("token", data.token);
    message.textContent = "Login successful";
  } else {
    message.textContent = data.message;
  }
}
