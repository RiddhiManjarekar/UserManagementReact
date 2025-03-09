import axios from 'axios';

const API_URL = 'https://reqres.in/api';

//Get all users
export const fetchUsers = async (page = 1) => {
  return await axios.get(`${API_URL}/users`, { params: { page } });
};

export const fetchUsersDelayed = async (page = 1) => {
  await new Promise(resolve => setTimeout(resolve, 3000)); 
  const response = await axios.get(`${API_URL}/users`, { params: { page } });
  return response.data;
};

// Create New User
export const createUser = async (userData: { name: string; job: string }) => {
  return await axios.post(`${API_URL}/users`, userData);
};

// Update User
export const updateUser = async (id: number, userData: { name: string; job: string }) => {
  return await axios.put(`${API_URL}/users/${id}`, userData);
};

// Partially Update User
export const patchUser = async (id: number, userData: Partial<{ name: string; job: string }>) => {
  return await axios.patch(`${API_URL}/users/${id}`, userData);
};

// Delete User
export const deleteUser = async (id: number) => {
  return await axios.delete(`${API_URL}/users/${id}`);
};

export const fetchUserById = async (id: number) => {
  try {
    const response = await axios.get(`https://reqres.in/api/users/${id}`);
    return response.data; 
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("User not found");
  }
};



