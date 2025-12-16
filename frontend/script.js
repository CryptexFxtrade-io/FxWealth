async function login() {
  const res = await fetch("https://YOUR_BACKEND/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email.value,
      password: password.value
    })
  });
  const data = await res.json();
  localStorage.setItem("token", data.token);
  location.href = data.role === "admin" ? "admin.html" : "dashboard.html";
}
