import axios from "axios";

const API_BASE_URL = "http://localhost:5127/api/Users"; // Updated base URL

export const login = async (credentials: any) => {
    const response = await axios.post(`${API_BASE_URL}/login`, credentials);
    return response.data.token; // Return the token from the response
};

export const signup = async (userData: any) => {
    const response = await axios.post(`${API_BASE_URL}/signup`, userData);
    return response.data.token; // Return the token from the response
};
