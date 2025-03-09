import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Text, Image, VStack } from "@chakra-ui/react";

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface UserDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
}

const UserDetails = ({ isOpen, onClose, user }: UserDetailsModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>User Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {user ? (
            <VStack spacing={3}>
              <Image borderRadius="full" boxSize="100px" src={user.avatar} alt={user.first_name} />
              <Text fontSize="lg">
                <strong>Name:</strong> {user.first_name} {user.last_name}
              </Text>
              <Text>
                <strong>Email:</strong> {user.email}
              </Text>
            </VStack>
          ) : (
            <Text color="red.500">User not found</Text>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UserDetails;
