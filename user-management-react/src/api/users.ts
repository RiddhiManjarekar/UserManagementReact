import axios from 'axios';
import { User } from '../types';

const API_URL = 'https://reqres.in/api';


export const fetchUsers = async (page = 1) => {
  const response = await axios.get(`${API_URL}/users`, { params: { page } });
  return response.data;
};


export const fetchUsersDelayed = async (page = 1) => {
  await new Promise(resolve => setTimeout(resolve, 3000));
  const response = await axios.get(`${API_URL}/users`, { params: { page } });
  return response.data;
};


export const createUser = async (userData: { first_name: string; last_name: string; email: string; job: string }) => {
  return await axios.post(`${API_URL}/users`, userData);
};


export const updateUser = async (id: number, userData: Partial<User>) => {
  try {
    const response = await axios.put(`${API_URL}/users/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("User update failed");
  }
};


export const patchUser = async (id: number, userData: Partial<{ name: string; job: string }>) => {
  return await axios.patch(`${API_URL}/users/${id}`, userData);
};


export const deleteUser = async (id: number) => {
  return await axios.delete(`${API_URL}/users/${id}`);
};


export const fetchUserById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/users/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("User not found");
  }
};
