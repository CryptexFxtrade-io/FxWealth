const API_BASE = "https://YOUR-BACKEND.onrender.com"; // <- Replace with your Render backend URL

export const api = async (url, options = {}) => {
  const res = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
      ...options.headers
    }
  });
  return res.json();
};
