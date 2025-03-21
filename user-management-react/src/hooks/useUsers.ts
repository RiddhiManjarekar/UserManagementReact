import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../api/users';

export const useUsers = (page: number = 1) => {
  return useQuery({
    queryKey: ['users', page], 
    queryFn: () => fetchUsers(page),
    staleTime: 30000,  
    retry: 2, 
    refetchOnWindowFocus: false, 
  });
};
