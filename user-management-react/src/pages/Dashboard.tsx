import { useState, useEffect } from 'react';
import { Button, useDisclosure, useToast, Spinner, HStack } from '@chakra-ui/react';
import { fetchUsersDelayed, fetchUserById, createUser, deleteUser as deleteExistingUser } from '../api/users';
import UserTable from '../components/UserTable';
import UserModal from '../components/UserModal';
import SearchFilter from '../components/SearchFilter';
import Pagination from '../components/Pagination';
import UserDetailsModal from '../components/UserDetails';
import { useAuthStore } from '../store/authStore';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

const Dashboard = () => {
  const { darkMode, toggleTheme } = useTheme();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isDetailsOpen, onOpen: openDetails, onClose: closeDetails } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);
  

  const { data, refetch, isLoading } = useQuery({
    queryKey: ['users', page],
    queryFn: () => fetchUsersDelayed(page),
  });

  const totalPages = data?.total_pages || 1;
  const usersList: User[] = data?.data || [];

  const filteredUsers = usersList.filter((user) =>
    user.first_name.toLowerCase().includes(search.toLowerCase()) ||
    user.last_name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  const createUserMutation = useMutation({
    mutationFn: (userData: { name: string; job: string }) => createUser(userData),
    onSuccess: () => {
      toast({ title: 'User created!', status: 'success', duration: 2000 });
      refetch();
      onClose();
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: (id: number) => deleteExistingUser(id),
    onSuccess: () => {
      toast({ title: 'User deleted!', status: 'error', duration: 2000 });
      refetch();
    },
  });

  const viewUserDetails = async (id: number) => {
    try {
      const response = await fetchUserById(id);
  
      console.log("Fetched User Details:", response); 
  
      if (response && response.data) {
        setUserDetails(response.data); 
        openDetails(); 
      } else {
        toast({
          title: "User not found!",
          status: "error",
          duration: 2000,
        });
      }
    } catch (error) {
      toast({
        title: "Error fetching user details!",
        status: "error",
        duration: 2000,
      });
    }
  };
  

  return (
    <div style={{ background: darkMode ? '#1a202c' : '#fff', color: darkMode ? '#fff' : '#000', padding: '20px' }}>
      <HStack spacing={4} mb={4}>
        <Button colorScheme="red" onClick={logout}>Logout</Button>
        {isAuthenticated && (
          <Button colorScheme="green" onClick={() => { setSelectedUser(undefined); onOpen(); }}>
            Add User
          </Button>
        )}
        <Button onClick={toggleTheme}>{darkMode ? "Light Mode" : "Dark Mode"}</Button>
      </HStack>

      <SearchFilter setSearch={setSearch} />

      {isLoading ? (
        <Spinner size="xl" />
      ) : (
        <>
          <UserTable
            users={filteredUsers}
            onEdit={(user) => { setSelectedUser(user); onOpen(); }}
            onDelete={(id) => deleteUserMutation.mutate(id)}
            onView={viewUserDetails} 
          />

          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}

      <UserDetailsModal isOpen={isDetailsOpen} onClose={closeDetails} user={userDetails} />

      <UserModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={(user) =>
          selectedUser
            ? createUserMutation.mutate({ name: user.first_name, job: "New User" })
            : createUserMutation.mutate({ name: user.first_name, job: "New User" })
        }
        defaultValues={selectedUser}
      />
    </div>
  );
};

export default Dashboard;
