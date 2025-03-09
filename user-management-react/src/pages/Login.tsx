import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { loginUser } from '../api/auth';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import { Input, Button, VStack, Text, useToast, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';

interface LoginInputs {
  email: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginInputs>();
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const toast = useToast();

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    try {
      const response = await loginUser(data);
  
      if (response.token) {
        login({ email: data.email, password: data.password }); 
        toast({ title: 'Login Successful!', status: 'success', duration: 2000 });
  
        setTimeout(() => {
          navigate('/dashboard'); 
        }, 100);
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
        <FormControl isInvalid={!!errors.email}>
          <FormLabel>Email</FormLabel>
          <Input 
            type="email" 
            placeholder="Email" 
            {...register('email', { 
              required: 'Email is required', 
              pattern: { value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, message: 'Enter a valid email' }
            })}
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>
        
        <FormControl isInvalid={!!errors.password}>
          <FormLabel>Password</FormLabel>
          <Input 
            type="password" 
            placeholder="Password" 
            {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })} 
          />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
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
