import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody,
  Text, Image, VStack
} from "@chakra-ui/react";

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  job?: string;
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
        <ModalBody p={4}>
          {user ? (
            <VStack spacing={4} align="center">
              <Image
                borderRadius="full"
                boxSize="120px"
                src={user.avatar}
                alt={user.first_name}
                boxShadow="md"
              />

              <Text fontSize="lg" fontWeight="bold">
                {user.first_name} {user.last_name}
              </Text>
              <Text color="gray.600">
                <strong>Email:</strong> {user.email}
              </Text>
              {user.job && (
                <Text color="blue.500">
                  <strong>Job:</strong> {user.job}
                </Text>
              )}
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
