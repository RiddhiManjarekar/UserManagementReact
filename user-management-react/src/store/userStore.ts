import { create } from 'zustand';
import { fetchUsers } from '../api/users';
import { User } from "../types";

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  fetchAllUsers: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  loading: false,
  error: null,

  fetchAllUsers: async () => {
    set({ loading: true, error: null }); 
    try {
      const data = await fetchUsers();
      set({ users: data.data, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch users", loading: false });
      console.error("Error fetching users:", error);
    }
  },
}));
