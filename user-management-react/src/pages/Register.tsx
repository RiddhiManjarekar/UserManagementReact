import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { registerUser } from '../api/auth';  
import { useNavigate } from 'react-router-dom';
import { 
  Input, 
  Button, 
  VStack, 
  Text, 
  useToast, 
  FormControl, 
  FormLabel, 
  FormErrorMessage 
} from '@chakra-ui/react';

interface RegisterInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting }, 
    watch
  } = useForm<RegisterInputs>();

  const navigate = useNavigate();
  const toast = useToast();
  const [error, setError] = useState('');

  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      setError('');
      const response = await registerUser(data);
      if (response.success) {
        toast({ title: 'Registration Successful!', status: 'success', duration: 2000 });
        navigate('/login'); 
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'An error occurred during registration');
    }
  };

  return (
    <VStack spacing={4} p={6}>
      <Text fontSize="2xl">Register</Text>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
        
        
        <FormControl isInvalid={!!errors.name}>
          <FormLabel>Name</FormLabel>
          <Input 
            type="text" 
            placeholder="Enter your name" 
            {...register('name', { required: 'Name is required' })} 
          />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>

        
        <FormControl isInvalid={!!errors.email}>
          <FormLabel>Email</FormLabel>
          <Input 
            type="email" 
            placeholder="Enter your email" 
            {...register('email', { 
              required: 'Email is required', 
              pattern: { 
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, 
                message: 'Enter a valid email address' 
              } 
            })} 
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>
        
        
        <FormControl isInvalid={!!errors.password}>
          <FormLabel>Password</FormLabel>
          <Input 
            type="password" 
            placeholder="Enter your password" 
            {...register('password', { 
              required: 'Password is required', 
              minLength: { value: 6, message: 'Password must be at least 6 characters' } 
            })} 
          />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>

        
        <FormControl isInvalid={!!errors.confirmPassword}>
          <FormLabel>Confirm Password</FormLabel>
          <Input 
            type="password" 
            placeholder="Confirm your password" 
            {...register('confirmPassword', { 
              required: 'Please confirm your password', 
              validate: value => value === watch('password') || 'Passwords do not match'
            })} 
          />
          <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
        </FormControl>

       
        {error && <Text color="red.500">{error}</Text>}

        
        <Button 
          colorScheme="blue" 
          type="submit" 
          width="full" 
          isLoading={isSubmitting} 
        >
          Register
        </Button>
      </form>
    </VStack>
  );
};

export default Register;
