import { useState, useEffect, useMemo } from 'react';
import { Button, useDisclosure, useToast, Spinner, HStack } from '@chakra-ui/react';
import { 
  fetchUsersDelayed, fetchUserById, createUser, updateUser, patchUser, deleteUser as deleteExistingUser 
} from '../api/users';
import UserTable from '../components/UserTable';
import SearchFilter from '../components/SearchFilter';
import Pagination from '../components/Pagination';
import UserDetailsModal from '../components/UserDetails';
import UserModal from '../components/UserModal';
import { useAuthStore } from '../store/authStore';
import { useQuery, useMutation, UseQueryResult } from '@tanstack/react-query';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';

const Dashboard = () => {
  const { darkMode, toggleTheme } = useTheme();
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [modalMode, setModalMode] = useState<'add' | 'edit' | 'patch'>('add');
  const [usersList, setUsersList] = useState<User[]>([]); 

  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isDetailsOpen, onOpen: openDetails, onClose: closeDetails } = useDisclosure();

  const toast = useToast();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [isAuthenticated, navigate]);

  
  const { data, refetch, isLoading }: UseQueryResult<{ data: User[]; total_pages: number }, Error> = useQuery({
    queryKey: ['users', page],
    queryFn: () => fetchUsersDelayed(page),
    staleTime: 60000,
  });

  useEffect(() => {
    if (data?.data) {
      setUsersList(data.data);
    }
  }, [data]);

  const totalPages: number = data?.total_pages ?? 1;

  
  const filteredUsers: User[] = useMemo(() => {
    return usersList.filter((user) =>
      user.first_name.toLowerCase().includes(search.toLowerCase()) ||
      user.last_name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, usersList]);

  
  const createUserMutation = useMutation({
    mutationFn: async (userData: Partial<User>) => {
      const response = await createUser(userData as Required<User>);
      return response.data;
    },
    onSuccess: (newUser) => {
      setUsersList((prev) => [...prev, newUser]);
      toast({ title: 'User created successfully!', status: 'success', duration: 2000 });
      refetch();
      onClose();
    },
    onError: () => {
      toast({ title: 'Error creating user!', status: 'error', duration: 2000 });
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: async ({ id, userData }: { id: number; userData: Partial<User> }) => {
      const response = await updateUser(id, userData as Required<User>);
      return response;
    },
    onSuccess: (updatedUser) => {
      setUsersList((prev) =>
        prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
      );
      toast({ title: 'User updated successfully!', status: 'success', duration: 2000 });
      refetch();
      onClose();
    },
    onError: () => {
      toast({ title: 'Error updating user!', status: 'error', duration: 2000 });
    },
  });

  const patchUserMutation = useMutation({
    mutationFn: async ({ id, userData }: { id: number; userData: Partial<User> }) => {
      const response = await patchUser(id, userData as Required<User>);
      return response.data;
    },
    onSuccess: () => {
      toast({ title: 'User patched successfully!', status: 'success', duration: 2000 });
      refetch();
      onClose();
    },
    onError: () => {
      toast({ title: 'Error patching user!', status: 'error', duration: 2000 });
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: async (id: number) => {
      await deleteExistingUser(id);
    },
    onSuccess: (_, id) => {
      setUsersList((prev) => prev.filter((user) => user.id !== id));
      toast({ title: 'User deleted successfully!', status: 'success', duration: 2000 });
      refetch();
    },
    onError: () => {
      toast({ title: 'Error deleting user!', status: 'error', duration: 2000 });
    },
  });

  
  const viewUserDetails = async (id: number) => {
    try {
      const userDetails = await fetchUserById(id);
      if (!userDetails) {
        toast({ title: 'User not found!', status: 'error', duration: 2000 });
        return;
      }
      setSelectedUser(userDetails);
      openDetails();
    } catch (error) {
      toast({ title: 'Error fetching user details!', status: 'error', duration: 2000 });
    }
  };

  return (
    <div style={{ background: darkMode ? '#1a202c' : '#fff', color: darkMode ? '#fff' : '#000', padding: '20px' }}>
      <HStack spacing={4} mb={4}>
        <Button colorScheme="red" onClick={logout}>Logout</Button>
        <Button colorScheme="green" onClick={() => { setModalMode('add'); onOpen(); }}>Add User</Button>
        <Button onClick={toggleTheme}>{darkMode ? 'Light Mode' : 'Dark Mode'}</Button>
      </HStack>

      <SearchFilter setSearch={setSearch} />

      {isLoading ? (
        <Spinner size="xl" />
      ) : (
        <>
          <UserTable
            users={filteredUsers}
            onEdit={(user) => { setSelectedUser(user); setModalMode('edit'); onOpen(); }}
            onDelete={(id) => deleteUserMutation.mutate(id)}
            onView={viewUserDetails}
            onPatch={(user) => { setSelectedUser(user); setModalMode('patch'); onOpen(); }}
          />
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}

      <UserDetailsModal 
        isOpen={isDetailsOpen} 
        onClose={closeDetails} 
        user={selectedUser} 
      />

      <UserModal 
        isOpen={isOpen} 
        onClose={onClose} 
        mode={modalMode} 
        defaultValues={selectedUser ?? {}} 
        onSubmit={(userData) => {
          if (modalMode === 'add') createUserMutation.mutate(userData);
          else if (modalMode === 'edit' && selectedUser?.id) 
            updateUserMutation.mutate({ id: selectedUser.id, userData });
          else if (modalMode === 'patch' && selectedUser?.id) 
            patchUserMutation.mutate({ id: selectedUser.id, userData });
        }} 
      />
    </div>
  );
};

export default Dashboard;
