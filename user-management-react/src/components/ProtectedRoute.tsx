import { JSX} from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { Spinner, Center } from "@chakra-ui/react"; 

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated === undefined)
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
