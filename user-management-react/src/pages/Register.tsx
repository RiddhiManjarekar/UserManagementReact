import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { loginUser } from '../api/auth';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import { Input, Button, VStack, Text, useToast, FormControl, FormLabel } from '@chakra-ui/react';

interface LoginInputs {
  email: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit } = useForm<LoginInputs>();
  const login = useAuthStore((state) => state.login);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const toast = useToast();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard'); 
    }
  }, [isAuthenticated, navigate]);

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    try {
      const response = await loginUser(data);
      if (response.token) {
        login({ email: data.email, password: data.password });
        toast({ title: 'Login Successful!', status: 'success', duration: 2000 });
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <VStack spacing={4} p={6}>
      <Text fontSize="2xl">Admin Login</Text>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input type="email" placeholder="Email" {...register('email', { required: true })} />
        </FormControl>
        
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input type="password" placeholder="Password" {...register('password', { required: true })} />
        </FormControl>

        {error && <Text color="red.500">{error}</Text>}

        <Button colorScheme="blue" type="submit" width="full">
          Login
        </Button>
      </form>
    </VStack>
  );
};

export default Login;
