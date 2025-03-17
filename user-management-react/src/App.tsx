import { ThemeProvider } from "./context/ThemeContext";
import AppRoutes from "./routes";

const App = () => {
  return (
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>
  );
};

export default App;
