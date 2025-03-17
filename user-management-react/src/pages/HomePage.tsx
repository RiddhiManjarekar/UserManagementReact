import { VStack, Button, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <VStack spacing={6} p={6}>
      <Heading>Welcome to User Management</Heading>
      <Button colorScheme="blue" onClick={() => navigate("/login")}>Admin Login</Button>
      <Button colorScheme="green" onClick={() => navigate("/register")}>Admin Register</Button>
    </VStack>
  );
};

export default HomePage;
