import { useAuthStore } from '../store/authStore';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Input, Button, VStack, Text } from '@chakra-ui/react';
import { useState } from 'react';

interface RegisterFormInputs {
  email: string;
  password: string;
}

const RegisterForm = () => {
  const { register, handleSubmit } = useForm<RegisterFormInputs>();
  const navigate = useNavigate();
  const auth = useAuthStore();
  const [error, setError] = useState('');

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    const success = await auth.register(data);
    if (success) {
      navigate('/login');
    } else {
      setError('Registration failed. Try again.');
    }
  };

  return (
    <VStack spacing={4}>
      <Text fontSize="2xl">Register</Text>
      {error && <Text color="red.500">{error}</Text>}
      <Input placeholder="Email" {...register('email', { required: true })} />
      <Input placeholder="Password" type="password" {...register('password', { required: true })} />
      <Button colorScheme="blue" onClick={handleSubmit(onSubmit)}>Register</Button>
    </VStack>
  );
};

export default RegisterForm;
