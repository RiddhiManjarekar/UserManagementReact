import { useForm } from 'react-hook-form';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, VStack, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UserFormData) => void;
  defaultValues?: UserFormData;
}

interface UserFormData {
  first_name: string;
  last_name: string;
  email: string;
}

const UserModal = ({ isOpen, onClose, onSubmit, defaultValues }: UserModalProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<UserFormData>({
    defaultValues,
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{defaultValues ? 'Edit User' : 'Add User'}</ModalHeader>
        <ModalBody>
          <VStack spacing={4}>
            <FormControl isInvalid={!!errors.first_name}>
              <FormLabel>First Name</FormLabel>
              <Input placeholder="First Name" {...register('first_name', { required: 'First name is required' })} />
              <FormErrorMessage>{errors.first_name?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.last_name}>
              <FormLabel>Last Name</FormLabel>
              <Input placeholder="Last Name" {...register('last_name', { required: 'Last name is required' })} />
              <FormErrorMessage>{errors.last_name?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.email}>
              <FormLabel>Email</FormLabel>
              <Input 
                placeholder="Email" 
                type="email" 
                {...register('email', { 
                  required: 'Email is required', 
                  pattern: { value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, message: 'Enter a valid email' }
                })} 
              />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button onClick={handleSubmit(onSubmit)} colorScheme="blue">Save</Button>
          <Button onClick={onClose} ml={2}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserModal;
