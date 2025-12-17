import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const registerUser = (data) => axios.post(`${API_URL}/auth/register`, data);
export const loginUser = (data) => axios.post(`${API_URL}/auth/login`, data);
export const getUser = (token) => axios.get(`${API_URL}/auth/user`, { headers: { Authorization: `Bearer ${token}` } });
export const createInvestment = (data, token) => axios.post(`${API_URL}/investments`, data, { headers: { Authorization: `Bearer ${token}` } });
export const getInvestments = (token) => axios.get(`${API_URL}/investments`, { headers: { Authorization: `Bearer ${token}` } });
