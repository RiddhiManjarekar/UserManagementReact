import { useEffect } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter,
  Button, Input, VStack, FormControl, FormLabel, FormErrorMessage, useToast
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { User } from '../types';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'add' | 'edit' | 'patch';
  defaultValues?: Partial<User>;
  onSubmit: (userData: Partial<User>) => void;
}

const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, mode, defaultValues, onSubmit }) => {
  const toast = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Partial<User>>({ defaultValues });

  // Reset form when mode or defaultValues change
  useEffect(() => {
    if (mode === 'add') {
      reset({ first_name: '', last_name: '', email: '', job: '' });
    } else {
      reset(defaultValues);
    }
  }, [defaultValues, mode, reset]);

  const handleFormSubmit = async (formData: Partial<User>) => {
    try {
      if (mode === 'patch' && !formData.job) {
        toast({ title: 'Please enter a job title.', status: 'warning', duration: 2000 });
        return;
      }

      await onSubmit(formData);
      toast({ title: `User ${mode === 'add' ? 'created' : 'updated'} successfully!`, status: 'success', duration: 2000 });
      onClose();
    } catch (error) {
      toast({ title: 'An error occurred. Please try again.', status: 'error', duration: 2000 });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {mode === 'add' ? 'Add User' : mode === 'edit' ? 'Edit User' : 'Patch User'}
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <VStack spacing={4}>
              {mode !== 'patch' && (
                <>
                  <FormControl isInvalid={!!errors.first_name}>
                    <FormLabel>First Name</FormLabel>
                    <Input {...register('first_name', { required: 'First name is required' })} />
                    <FormErrorMessage>{errors.first_name?.message}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.last_name}>
                    <FormLabel>Last Name</FormLabel>
                    <Input {...register('last_name', { required: 'Last name is required' })} />
                    <FormErrorMessage>{errors.last_name?.message}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.email}>
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="email"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: { value: /^\S+@\S+$/, message: 'Invalid email format' },
                      })}
                    />
                    <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                  </FormControl>
                </>
              )}

              {mode !== 'edit' && (
                <FormControl isInvalid={!!errors.job}>
                  <FormLabel>Job</FormLabel>
                  <Input {...register('job', { required: mode === 'patch' ? 'Job title is required' : false })} />
                  <FormErrorMessage>{errors.job?.message}</FormErrorMessage>
                </FormControl>
              )}
            </VStack>

            <ModalFooter>
              <Button colorScheme="blue" type="submit">
                {mode === 'add' ? 'Add' : 'Save'}
              </Button>
              <Button onClick={onClose} ml={3}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UserModal;
