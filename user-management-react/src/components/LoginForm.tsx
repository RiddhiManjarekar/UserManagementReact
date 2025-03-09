import { useAuthStore } from '../store/authStore';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Input, Button, VStack, Text } from '@chakra-ui/react';
import { useState } from 'react';

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginForm = () => {
  const { register, handleSubmit } = useForm<LoginFormInputs>();
  const navigate = useNavigate();
  const auth = useAuthStore();
  const [error, setError] = useState('');

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    const success = await auth.login(data);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <VStack spacing={4}>
      <Text fontSize="2xl">Login</Text>
      {error && <Text color="red.500">{error}</Text>}
      <Input placeholder="Email" {...register('email', { required: true })} />
      <Input placeholder="Password" type="password" {...register('password', { required: true })} />
      <Button colorScheme="green" onClick={handleSubmit(onSubmit)}>Login</Button>
    </VStack>
  );
};

export default LoginForm;
