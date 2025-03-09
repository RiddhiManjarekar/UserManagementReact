import { create } from 'zustand';
import { fetchUsers } from '../api/users';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

interface UserState {
  users: User[];
  fetchAllUsers: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  fetchAllUsers: async () => {
    const data = await fetchUsers();
    set({ users: data.data });
  }
}));
