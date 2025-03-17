import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { Button } from "@chakra-ui/react";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuthStore();

  return (
    <nav>
      <Link to="/dashboard">Dashboard</Link>
      {isAuthenticated ? (
        <Button onClick={logout} colorScheme="red">Logout</Button>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
};

export default Navbar;
