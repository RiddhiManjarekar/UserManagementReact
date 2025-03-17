import axios from 'axios';
import { Credentials, RegisterData } from '../types';

const API_URL = 'https://reqres.in/api';

export const loginUser = async (credentials: Credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    throw new Error('Login failed. Please check your credentials.');
  }
};

export const registerUser = async (userData: RegisterData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw new Error('Registration failed.');
  }
};
